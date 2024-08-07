import { CreateProductTransactionMigration } from "./product-transaction/CreateProductTransactionMigration"


export class Migrations {
  async execute() {
    try {
      await CreateProductTransactionMigration.execute()
    } catch(error) {
      console.error('Error running migration up:', error)
    }
  }

  async reset() {
    try {
      await CreateProductTransactionMigration.reset()
    } catch(error) {
      console.error('Error running migration down:', error)
    }
   
  }
}