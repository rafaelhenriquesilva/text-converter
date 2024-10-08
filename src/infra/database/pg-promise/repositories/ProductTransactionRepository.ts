import { ProductTransactionEntity } from "../../../../domain/entities/ProductTransactionEntity"
import { QueryField } from "../../@shared/query-interface"
import { DatabaseConnection } from "../../database-connection"
import { IProductTransactionRepository } from "../../../../domain/interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { formatDateYYYYMMDD } from "../../../util/DateUtil"

export class ProductTransactionRepository implements IProductTransactionRepository {
  connection: DatabaseConnection
  tableName: string

  constructor() {
    this.connection = DatabaseConnection.getInstance()
    this.tableName = 'public.product_transaction'
  }


  async findByCondition(input: { idOrder?: number; startDate?: string; endDate?: string }): Promise<ProductTransactionEntity[]> {

    let query = `
            SELECT
              id,
              client_name,
              id_user,
              id_product,
              id_order,
              product_value,
              transaction_date,
              created_at,
              updated_at
            FROM product_transaction  
      `
    let conditionQuery: string = ' WHERE '

    if (input.idOrder) {
      conditionQuery += ` id_order = ${input.idOrder} AND`
    }

    if (input.startDate && input.endDate) {
      conditionQuery += ` transaction_date > '${input.startDate}' AND  transaction_date < '${input.endDate}' AND`
    }

    conditionQuery = conditionQuery.slice(-3) === 'AND' ? conditionQuery.slice(0, -3) : conditionQuery
    query += conditionQuery
    const SchemaModel = await this.connection.query(query)
    return SchemaModel.map((row: any) => this.mapRowToEntity(row))
  }

  async findByUniqueIdentifiers(uniqueIdentifiers: string[]): Promise<ProductTransactionEntity[]> {
    const uniqueIdentifiersStr = uniqueIdentifiers.map(unique => `'${unique}'`).join(',')
    const query = `
        SELECT
          id,
          client_name,
          id_user,
          id_product,
          id_order,
          product_value,
          transaction_date,
          created_at,
          updated_at
        FROM product_transaction pt 
        WHERE unique_identifier IN (${uniqueIdentifiersStr})
      `
    const SchemaModel = await this.connection.query(query)
    return SchemaModel.map((row: any) => this.mapRowToEntity(row))
  }

  async deleteAll(): Promise<void> {
    await this.connection.delete({
      table: this.tableName
    })
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
    const fields = this.getOnlyTableFieldsName()
    const SchemaModel = await this.connection.find({
      table: this.tableName,
      fields
    })

    return SchemaModel.map((row: any) => this.mapRowToEntity(row))
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
    const fields = this.getOnlyTableFieldsName()

    const SchemaModel = await this.connection.find({
      table: this.tableName,
      fields: fields,
      where: [{
        name: 'id',
        value: id
      }]
    })

    return SchemaModel.map((row: any) => this.mapRowToEntity(row))
  }

  async insert(input: ProductTransactionEntity[]): Promise<void> {
    const fieldsoInsert: QueryField[][] = input.map(data => ([
      { name: 'client_name', value: data.clientName },
      { name: 'id_product', value: data.idProduct },
      { name: 'product_value', value: data.productValue },
      { name: 'transaction_date', value: data.transactionDate ? formatDateYYYYMMDD(data.transactionDate) : null },
      { name: 'id_user', value: data.idUser },
      { name: 'id_order', value: data.idOrder },
    ]))

    await this.connection.insert({
      fields: fieldsoInsert,
      table: this.tableName
    })
  }

  async update(input: Partial<ProductTransactionEntity>): Promise<void> {
    await this.connection.update({
      fields: [
        { name: 'client_name', value: input.clientName },
        { name: 'id_product', value: input.idProduct },
        { name: 'product_value', value: input.productValue },
        { name: 'transaction_date', value: input.transactionDate },
        { name: 'id_user', value: input.idUser },
        { name: 'id_order', value: input.idOrder },
      ],
      table: this.tableName,
      where: [{
        name: 'id',
        value: input.id
      }]
    })
  }

  private mapRowToEntity(row: any) {
    return new ProductTransactionEntity({
      clientName: row.client_name,
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

  getOnlyTableFieldsName() {
    const fields: QueryField[] = this.getTableFields()

    for (const field of fields) {
      delete field.value
    }
    return fields
  }

  getTableFields(input?: Partial<ProductTransactionEntity>): QueryField[] {
    return [
      { name: 'id', value: input?.id },
      { name: 'client_name', value: input?.clientName },
      { name: 'id_user', value: input?.idUser },
      { name: 'id_product', value: input?.idProduct },
      { name: 'id_order', value: input?.idOrder },
      { name: 'product_value', value: input?.productValue },
      { name: 'transaction_date', value: input?.transactionDate },
      { name: 'created_at', value: input?.createdAt },
      { name: 'updated_at', value: input?.updatedAt }
    ]
  }

  mappingWhereCondition(input: Partial<ProductTransactionEntity>): QueryField[] {
    let tableFields = this.getTableFields(input)
    tableFields = tableFields.filter(item => item.value)
    return tableFields
  }
}

