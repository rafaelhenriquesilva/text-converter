import pgPromise, { IDatabase, IMain, ITask } from 'pg-promise';
import { DeleteQueryInterface, InsertQueryInterface, SelectQueryInterface, UpdateQueryInterface } from '../@shared/query-interface';
import { PostgresQueryAdapter } from '../../adapters/postgres/postgres-query-adapter';

interface ConnectionConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export default class PgPromiseAdapter {
  private pgp: IMain;
  private db: IDatabase<any>;

  constructor(private readonly config: ConnectionConfig) {
    this.pgp = pgPromise({
      capSQL: true // Capitalize all generated SQL
    });
    this.db = this.pgp(this.config);
  }

  async query(query: string, values?: any[]): Promise<any[]> {
    try {
      return await this.db.any(query, values);
    } catch (error: any) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  }

  async find(input: SelectQueryInterface): Promise<any[]> {
    const query = PostgresQueryAdapter.find(input);
    return this.query(query);
  }

  async insert(input: InsertQueryInterface): Promise<any[]> {
    return this.query(PostgresQueryAdapter.insert(input));
  }

  async update(input: UpdateQueryInterface): Promise<any[]> {
    return this.query(PostgresQueryAdapter.update(input));
  }

  async delete(input: DeleteQueryInterface): Promise<any[]> {
    return this.query(PostgresQueryAdapter.delete(input));
  }

  async runInTransaction<T>(taskFn: (task: ITask<any>) => Promise<T>): Promise<T> {
    return this.db.tx(taskFn);
  }

  async close() {
    this.pgp.end();
  }
}
