import { DatabaseConnection } from "../../../database-connection"


export class CreateProductTransactionMigration {
  static async execute() {
    const connection = DatabaseConnection.getInstance()
    await connection.query(`
                -- Cria a extensão uuid-ossp, se não existir
                CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

                -- Cria a tabela product_transaction, se não existir
                CREATE TABLE IF NOT EXISTS product_transaction (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    client_name varchar(45) not null,
                    id_user integer not null,
                    id_order integer not null,
                    id_product integer not null,
                    product_value float not null,
                    transaction_date Date not null,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    unique_identifier varchar(200)  -- Adiciona a coluna para o identificador único
                );

                -- Cria a função para atualizar o campo updated_at
                  CREATE OR REPLACE FUNCTION update_updated_at_column()
                  RETURNS TRIGGER AS $$
                  BEGIN
                      NEW.updated_at = NOW();
                      RETURN NEW;
                  END;
                  $$ LANGUAGE 'plpgsql';

                  -- Cria a função para gerar o identificador único
                  CREATE OR REPLACE FUNCTION generate_unique_identifier()
                  RETURNS TRIGGER AS $$
                  BEGIN
                      NEW.unique_identifier := NEW.client_name || '_' || NEW.id_product || '_' || NEW.id_user || '_' || NEW.id_order || '_' || NEW.transaction_date;
                      RETURN NEW;
                  END;
                  $$ LANGUAGE 'plpgsql';

                  -- Cria a trigger para atualizar os campos updated_at
                  CREATE TRIGGER update_product_transaction_updated_at
                  BEFORE UPDATE ON product_transaction
                  FOR EACH ROW
                  EXECUTE PROCEDURE update_updated_at_column();

                  -- Cria a trigger para gerar o identificador único na inserção e atualização
                  CREATE TRIGGER generate_unique_identifier_trigger
                  BEFORE INSERT OR UPDATE ON product_transaction
                  FOR EACH ROW
                  EXECUTE PROCEDURE generate_unique_identifier();

                  -- Cria um índice único para a coluna unique_identifier
                  CREATE UNIQUE INDEX unique_identifier_idx ON product_transaction(unique_identifier);

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