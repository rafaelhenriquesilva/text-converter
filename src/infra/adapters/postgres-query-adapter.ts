import { DeleteQueryInterface, InsertQueryInterface, QueryField, SelectQueryInterface, SimpleField, UpdateQueryInterface } from "../database/@shared/query-interface"

export class PostgresQueryAdapter {
  static find(input: SelectQueryInterface): string {
    let query = 'SELECT '

    for (const field of input.fields) {
      query += `${field.name},`
    }

    query = this.removeWordOfString(query, ',', -1)

    query += ` FROM ${input.table} `

    query += this.createWhereCondition(input.where)

    query = this.createGroupByOROrderBy(query, "GROUP", input.groupBy)

    query = this.createGroupByOROrderBy(query, "ORDER", input.orderBy)

    return query
  }


  static insert(input: InsertQueryInterface): string {
    if (input.fields.length === 0) {
      throw new Error('Insert many query needs at least one set of fields.')
    }

    const table = input.table
    const fieldsName = input.fields[0].map((data) => data.name)

    let query = `INSERT INTO ${table} (`

    for (const fieldName of fieldsName) {
      query += `${fieldName},`
    }

    query = this.removeWordOfString(query, ',', -1)

    query += `) VALUES `

    for (let listFields of input.fields) {
      if (listFields) {
        listFields = listFields.filter(field => field.value !== undefined && field.value !== null)
        if (listFields.length !== fieldsName.length) {
          throw new Error('All field sets must have the same number of fields.')
        }

        let values = '('
        for (const field of listFields) {
          values += `${this.formatQueryValue(field)},`

        }
        values = this.removeWordOfString(values, ',', -1)
        values += '),'

        query += values
      }
      

    }
    query = this.removeWordOfString(query, ',', -1)
    return query
  }

  static update(input: UpdateQueryInterface): string {
    input.fields = input.fields.filter(field => field.value !== undefined && field.value !== null)

    if (input.fields.length === 0) {
      throw new Error('UPDATE query needs at least one field. Verify if the fields have correct values!')
    }

    input.where = input.where.filter(field => field.value !== undefined && field.value !== null)

    if (input.where.length === 0) {
      throw new Error('UPDATE query needs at least one field on where condition. Verify if the fields have correct values!')
    }

    let query = `UPDATE ${input.table} SET `


    for (const field of input.fields) {
      const value = this.formatQueryValue(field)
      query += `${field.name} = ${value},`
    }

    query = this.removeWordOfString(query, ',', -1)

    query += this.createWhereCondition(input.where)

    return query
  }

  static delete(input: DeleteQueryInterface): string {
    input.where = input.where?.filter(field => field.value !== undefined && field.value !== null)

    let query = `DELETE FROM ${input.table} `

    if (input.where?.length !== 0) {
      query += this.createWhereCondition(input.where)
    }
   

    return query
  }


  static formatQueryValue(field: QueryField): string {
    const value = field.value && typeof field.value === 'string' ? `'${field.value}'` : `${field.value}`
    return value
  }

  static removeWordOfString(query: string, word: string, spaces: number) {
    return query.slice(spaces) === word ? query.slice(0, spaces) : query
  }

  static createWhereCondition(fields?: QueryField[]): string {
    let whereCondition = ''
    if (fields && fields.length > 0) {
      whereCondition += ' WHERE '

      for (const field of fields) {
        const value = this.formatQueryValue(field)
        whereCondition += `${field.name} ${field.equal === false ? '!=' : '='} ${value} AND `
      }

      whereCondition = this.removeWordOfString(whereCondition, 'AND ', -4)
    }
    return whereCondition
  }

  static createGroupByOROrderBy(query: string, type: 'GROUP' | 'ORDER', fields?: SimpleField[]): string {
    if (fields && fields.length === 0) {
      throw new Error(`${type} BY condition needs at least one field`)
    }


    if (fields) {
      query += type === 'GROUP' ? ' GROUP BY ' : type === 'ORDER' ? ' ORDER BY ' : ''

      for (const field of fields) {
        query += `${field.name},`
      }

      query = this.removeWordOfString(query, ',', -1)
    }

    return query
  }
}