/**
 * @params table: nome da tabela
 */
export interface SelectQueryInterface {
    table: string
    fields: QueryField[]
    where?: QueryField[]
    orderBy?: SimpleField[]
    groupBy?: SimpleField[]
}

export interface DeleteQueryInterface {
    table: string
    where?: QueryField[]
}

export interface UpdateQueryInterface {
    table: string
    fields: QueryField[]
    where: QueryField[]
}

export interface InsertQueryInterface {
    table: string
    fields: QueryField[][]
}

/**
 * @params name: nome da coluna na tabela
 * @params value: valor da coluna na tabela
 * @params equal: define se quer usar '=' ou '!=' na query
 */
export interface QueryField {
    name: string
    value?: string | number | boolean | Date | null
    equal?: boolean
}

/**
 * @params name: nome da coluna na tabela
 */
export interface SimpleField {
    name: string
}