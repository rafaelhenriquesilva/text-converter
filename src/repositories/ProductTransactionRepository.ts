
import { ProductTransactionEntity } from "../entities/ProductTransactionEntity"
import { DatabaseConnection } from "../infra/database/database-connection"
import { GlobalRepositoryInterface } from "../interfaces/repositories/GlobalRepositoryInterface"
export class ProductTransactionRepository implements GlobalRepositoryInterface<ProductTransactionEntity> {
  connection: DatabaseConnection
  tableName: string

  constructor() {
    this.connection = DatabaseConnection.getInstance()
    this.tableName = 'luizalabs.product_transaction'
  }


  async listAll(): Promise<ProductTransactionEntity[]> {
    const SchemaModel = await this.connection.find({
      table: this.tableName,
      fields: [
        { name: '*' }
      ]
    })

    return SchemaModel.map((row: any) => this.mapRowToEntity(row))

  }

  private mapRowToEntity(row: any) {
    return new ProductTransactionEntity({
      name: row.name,
      idProduct: row.id_product,
      productValue: row.product_value,
      createdAt: row.created_at,
      transactionDate: row.transaction_date,
      updatedAt: row.updated_at,
      idUser: row.id_user,
      id: row.id,
      idOrder: row.id_order,

    })
  }
  async deleteById(id: string): Promise<void> {
    await this.connection.delete({
      table: this.tableName,
      where: [{
        name: 'id',
        value: id
      }]
    })
  }

  async findById(id: string): Promise<ProductTransactionEntity[]> {
    const SchemaModel = await this.connection.find({
      table: this.tableName,
      fields: [
        { name: '*' }
      ],
      where: [{
        name: 'id',
        value: id
      }]
    })

    return SchemaModel.map((row: any) => this.mapRowToEntity(row))

  }
  async insert(input: Partial<ProductTransactionEntity>): Promise<Partial<ProductTransactionEntity[]>> {
    return await this.connection.insert({
      fields:
        [{ name: 'name', value: input.name },
          { name: 'id_product', value: input.idProduct },
          { name: 'product_value', value: input.productValue },
          { name: 'transaction_date', value: input.transactionDate },
          { name: 'id_user', value: input.idUser },
          { name: 'id_order', value: input.idOrder },
        ], table: this.tableName,
      retuning: {
        name: 'id'
      }
    })
  } async update(input: Partial<ProductTransactionEntity>): Promise<void> {
    await this.connection.update({
      fields:
        [{ name: 'name', value: input.name },
          { name: 'id_product', value: input.idProduct },
          { name: 'product_value', value: input.productValue },
          { name: 'transaction_date', value: input.transactionDate },
          { name: 'id_user', value: input.idUser },
          { name: 'id_order', value: input.idOrder },
        ], table: this.tableName,
      where: [{
        name: 'id',
        value: input.id
      }]
    })
  }
}