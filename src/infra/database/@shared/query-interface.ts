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

export interface QueryField {
    name: string
    value?: string | number | boolean | Date | null
    equal?: boolean
}

export interface SimpleField {
    name: string
}