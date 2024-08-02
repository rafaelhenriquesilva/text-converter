import { IDatabaseConnection, InputDatabaseConnection } from "./@shared/database-connection-interface"
import { SelectQueryInterface, InsertQueryInterface, UpdateQueryInterface, DeleteQueryInterface } from "./@shared/query-interface"
import PostgreSQLAdapter from "./postgres/postgres-adapter"
import 'dotenv/config'
export class DatabaseConnection implements IDatabaseConnection {
  private static instance: DatabaseConnection
  private connection: PostgreSQLAdapter | null = null
  static dbConfig: InputDatabaseConnection | null
  private constructor() { }

  static getInstance(): DatabaseConnection {

    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  private start(): PostgreSQLAdapter {
    const port: number =
      DatabaseConnection.dbConfig?.DB_PORT ?
        DatabaseConnection.dbConfig.DB_PORT : process.env.DB_PORT ?
          parseInt(process.env.DB_PORT) : 5432
    return new PostgreSQLAdapter({
      database: DatabaseConnection.dbConfig?.DB_NAME || process.env.DB_NAME || '',
      host: DatabaseConnection.dbConfig?.DB_HOST || process.env.DB_HOST || '',
      password: DatabaseConnection.dbConfig?.DB_PASSWORD || process.env.DB_PASSWORD || '',
      user: DatabaseConnection.dbConfig?.DB_USER || process.env.DB_USER || '',
      port
    })
  }

  async getConnection(): Promise<PostgreSQLAdapter> {
    if (!this.connection) {
      this.connection = this.start()
    }
    return this.connection
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close()
      this.connection = null
    }
  }

  async query(query: string, values?: any[]): Promise<any[]> {
    const connection = await this.getConnection()
    try {
      return await connection.query(query, values)
    } finally {
      await this.closeConnection()
    }
  }

  async find(input: SelectQueryInterface): Promise<any[]> {
    const connection = await this.getConnection()
    try {
      return await connection.find(input)
    } finally {
      await this.closeConnection()
    }
  }

  async insert(input: InsertQueryInterface): Promise<any[]> {
    const connection = await this.getConnection()
    try {
      return await connection.insert(input)
    } finally {
      await this.closeConnection()
    }
  }

  async update(input: UpdateQueryInterface): Promise<any[]> {
    const connection = await this.getConnection()
    try {
      return await connection.update(input)
    } finally {
      await this.closeConnection()
    }
  }

  async delete(input: DeleteQueryInterface): Promise<any[]> {
    const connection = await this.getConnection()
    try {
      return await connection.delete(input)
    } finally {
      await this.closeConnection()
    }
  }
}
