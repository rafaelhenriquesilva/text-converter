import { CreateProductTransactionMigration } from "./product-transaction/CreateProductTransactionMigration"


export class Migrations {
  async execute() {
    await CreateProductTransactionMigration.execute()
  }

  async reset() {
    await CreateProductTransactionMigration.reset()
  }
}