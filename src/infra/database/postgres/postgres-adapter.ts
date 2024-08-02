import pgPromise, { IDatabase, IMain } from 'pg-promise'
import { DeleteQueryInterface, InsertQueryInterface, SelectQueryInterface, UpdateQueryInterface } from '../@shared/query-interface'
import { PostgresQueryAdapter } from '../../adapters/postgres-query-adapter'

interface ConnectionConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
}

export default class PostgreSQLAdapter {
  private pgp: IMain
  private db: IDatabase<any>

  constructor(private readonly config: ConnectionConfig) {
    this.pgp = pgPromise({
      capSQL: true // Capitalize all generated SQL
    })
    this.db = this.pgp(this.config)
  }

  async query(query: string, values?: any[]): Promise<any[]> {
    try {
      return await this.db.any(query, values)
    } catch (error: any) {
      throw new Error(`Error executing query: ${error.message}`)
    }
  }

  async find(input: SelectQueryInterface): Promise<any[]> {
    return this.query(PostgresQueryAdapter.find(input))
  }

  async insert(input: InsertQueryInterface): Promise<any[]> {
    return this.query(PostgresQueryAdapter.insert(input))
  }

  async update(input: UpdateQueryInterface): Promise<any[]> {
    return this.query(PostgresQueryAdapter.update(input))
  }

  async delete(input: DeleteQueryInterface): Promise<any[]> {
    return this.query(PostgresQueryAdapter.delete(input))
  }

  async close() {
    this.pgp.end()
  }
}
