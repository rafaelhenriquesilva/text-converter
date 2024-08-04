
import { ProductTransactionEntity } from "../entities/ProductTransactionEntity"
import { QueryField } from "../infra/database/@shared/query-interface"
import { DatabaseConnection } from "../infra/database/database-connection"
import { IProductTransactionRepository } from "../interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { formatDateYYYYMMDD } from "../util/date-util"
export class ProductTransactionRepository implements IProductTransactionRepository {
  connection: DatabaseConnection
  tableName: string

  constructor() {
    this.connection = DatabaseConnection.getInstance()
    this.tableName = 'public.product_transaction'
  }
 

  async findByParameters(input: Partial<ProductTransactionEntity>): Promise<ProductTransactionEntity[]> {
    const SchemaModel = await this.connection.find({
      table: this.tableName,
      fields: [
        { name: '*' }
      ],
      where: this.mappingWhereCondition(input)
    })

    return SchemaModel.map((row: any) => this.mapRowToEntity(row))
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
      transactionDate: row.transaction_date,
      idUser: row.id_user,
      id: row.id,
      idOrder: row.id_order,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  async deleteById(id: string): Promise<void> {
    await this.connection.delete({
      table: this.tableName,
      where: this.mappingWhereCondition({
        id  
      })
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

  mappingWhereCondition(input: Partial<ProductTransactionEntity>): QueryField[] {
    let tableFields = [
      {
        name: 'id',
        value: input.id
      },
      {
        name: 'name',
        value: input.name
      },
      {
        name: 'id_user',
        value: input.idUser
      },
      {
        name: 'id_product',
        value: input.idProduct
      },
      {
        name: 'id_order',
        value: input.idOrder
      },
      {
        name: 'product_value',
        value: input.productValue
      },
      {
        name: 'transaction_date',
        value: input.transactionDate
      },
      {
        name: 'created_at',
        value: input.createdAt
      },
      {
        name: 'updated_at',
        value: input.updatedAt
      }
    ]

    tableFields = tableFields.filter(item => item.value)
    return tableFields
  }

  async insert(input: Partial<ProductTransactionEntity>): Promise<void> {
    await this.connection.insert({
      fields:
        [
          [
            { name: 'name', value: input.name },
            { name: 'id_product', value: input.idProduct },
            { name: 'product_value', value: input.productValue },
            { name: 'transaction_date', value: 
                input.transactionDate ? formatDateYYYYMMDD(input.transactionDate) : null
            },
            { name: 'id_user', value: input.idUser },
            { name: 'id_order', value: input.idOrder },
          ]
        ], 
      table: this.tableName
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