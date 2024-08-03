import { CreateProductTransactionMigration } from "./product-transaction/create-product-transaction-migration"


export class Migrations {
  async execute() {
    await CreateProductTransactionMigration.execute()
  }

  async reset() {
    await CreateProductTransactionMigration.reset()
  }
}