import { DatabaseConnection } from "../../infra/database/database-connection";


export class CreateProductTransactionMigration {
    static async execute() {
        const connection = DatabaseConnection.getInstance()
        await connection.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            -- Cria a tabela product_transaction, se não existir
            CREATE TABLE IF NOT EXISTS product_transaction (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name varchar(45) not null,
                id_user varchar(10) not null,
                id_order varchar(10) not null,
                id_product varchar(10) not null,
                product_value float not null,
                transaction_date Date not null,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Cria a função para atualizar o campo updated_at
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ language 'plpgsql';

            -- Cria a trigger para atualizar os campos updated_at
            CREATE TRIGGER update_product_transaction_updated_at
            BEFORE UPDATE ON product_transaction
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
        `)
    }

    static async reset() {
        const connection = DatabaseConnection.getInstance()
        await connection.query(`
            DROP TRIGGER IF EXISTS update_product_transaction_updated_at ON product_transaction;
            DROP TABLE IF EXISTS product_transaction;
        `)
    }
}