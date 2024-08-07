import { ITask } from "pg-promise";
import { IDatabaseConnection, InputDatabaseConnection } from "./@shared/database-connection-interface";
import { SelectQueryInterface, InsertQueryInterface, UpdateQueryInterface, DeleteQueryInterface } from "./@shared/query-interface";
import PgPromiseAdapter from "./pg-promise/pg-promise-adapter";
import * as dotenv from 'dotenv';

// Carregar o arquivo .env correto com base no NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env_test' : '.env';
dotenv.config({ path: envFile });

export class DatabaseConnection implements IDatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: PgPromiseAdapter | null = null;
  static dbConfig: InputDatabaseConnection | null;
  
  private constructor() { }
  
  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private start(): PgPromiseAdapter {
    const port: number =
      DatabaseConnection.dbConfig?.DB_PORT
        ? DatabaseConnection.dbConfig.DB_PORT
        : process.env.DB_PORT
          ? parseInt(process.env.DB_PORT)
          : 5432;
    return new PgPromiseAdapter({
      database: DatabaseConnection.dbConfig?.DB_NAME || process.env.DB_NAME || '',
      host: DatabaseConnection.dbConfig?.DB_HOST || process.env.DB_HOST || '',
      password: DatabaseConnection.dbConfig?.DB_PASSWORD || process.env.DB_PASSWORD || '',
      user: DatabaseConnection.dbConfig?.DB_USER || process.env.DB_USER || '',
      port,
    });
  }

  async getConnection(): Promise<PgPromiseAdapter> {
    if (!this.connection) {
      this.connection = this.start();
    }
    return this.connection;
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }
  }

  async query(query: string, values?: any[]): Promise<any[]> {
    const connection = await this.getConnection();
    try {
      return await connection.query(query, values);
    } finally {
      await this.closeConnection();
    }
  }

  async find(input: SelectQueryInterface): Promise<any[]> {
    const connection = await this.getConnection();
    try {
      return await connection.find(input);
    } finally {
      await this.closeConnection();
    }
  }

  async insert(input: InsertQueryInterface): Promise<any[]> {
    const connection = await this.getConnection();
    try {
      return await connection.insert(input);
    } finally {
      await this.closeConnection();
    }
  }

  async update(input: UpdateQueryInterface): Promise<any[]> {
    const connection = await this.getConnection();
    try {
      return await connection.update(input);
    } finally {
      await this.closeConnection();
    }
  }

  async delete(input: DeleteQueryInterface): Promise<any[]> {
    const connection = await this.getConnection();
    try {
      return await connection.delete(input);
    } finally {
      await this.closeConnection();
    }
  }

  async runInTransaction<T>(taskFn: (task: ITask<any>) => Promise<T>): Promise<T> {
    const connection = await this.getConnection();
    try {
      return await connection.runInTransaction(taskFn);
    } finally {
      // Do not close the connection here because it's managed by the transaction
    }
  }
}
