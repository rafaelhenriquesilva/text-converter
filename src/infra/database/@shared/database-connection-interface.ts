import { DeleteQueryInterface, InsertQueryInterface, SelectQueryInterface, UpdateQueryInterface } from "./query-interface"

export interface IDatabaseConnection {
    query(query: string) : Promise<any[]>
    find(input: SelectQueryInterface) : Promise<any[]>
    insert(input: InsertQueryInterface) : Promise<any[]>
    update(input: UpdateQueryInterface) : Promise<any[]>
    delete(input: DeleteQueryInterface) : Promise<any[]>
    getConnection(): any
    closeConnection(): Promise<void>
}

export interface InputDatabaseConnection {
    DB_NAME: string
    DB_HOST: string
    DB_PASSWORD: string
    DB_USER: string
    DB_PORT: number
}