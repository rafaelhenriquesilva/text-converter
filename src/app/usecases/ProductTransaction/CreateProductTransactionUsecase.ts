import { ProductTransactionEntity } from "../../../domain/entities/ProductTransactionEntity";
import { IProductTransactionRepository } from "../../../domain/interfaces/repositories/ProductTransaction/IProductTransactionRepository";
import { ICreateProductTransactionUseCase, OutputCreateProductTransaction } from "../../../domain/interfaces/usecases/ProductTransaction/ICreateProductTransactionUsecase";

export class CreateProductTransactionUseCase implements ICreateProductTransactionUseCase {
  private repository: IProductTransactionRepository;
  private batchSize: number;

  constructor(repository: IProductTransactionRepository, batchSize: number = 50) {
    this.repository = repository;
    this.batchSize = batchSize;
  }

  async handle(input: ProductTransactionEntity[]): Promise<OutputCreateProductTransaction> {
    console.info('Starting to handle product transactions...');

    const listUniqueIdentifiers = this.extractUniqueIdentifiers(input);
    console.info('Extracted unique identifiers:', listUniqueIdentifiers.length);

    const existingTransactions = await this.repository.findByUniqueIdentifiers(listUniqueIdentifiers);
    console.info('Existing transactions found:', existingTransactions.length);

    const { newTransactions, duplicatedTransactions } = this.filterTransactions(input, existingTransactions);

    console.info('New transactions to insert:', newTransactions.length);
    console.info('Duplicated transactions:', duplicatedTransactions.length);

    const failedTransactions = await this.insertNewTransactions(newTransactions);

    return this.createHandleResult(newTransactions, duplicatedTransactions, failedTransactions);
  }

  private extractUniqueIdentifiers(transactions: ProductTransactionEntity[]): string[] {
    return transactions.map(transaction => transaction.uniqueIdentifier);
  }

  private filterTransactions(
    input: ProductTransactionEntity[],
    existingTransactions: ProductTransactionEntity[]
  ): { newTransactions: ProductTransactionEntity[], duplicatedTransactions: ProductTransactionEntity[] } {
    const existingUniqueIdentifiers = new Set(existingTransactions.map(transaction => transaction.uniqueIdentifier));

    const newTransactions = input.filter(transaction => !existingUniqueIdentifiers.has(transaction.uniqueIdentifier));
    const duplicatedTransactions = input.filter(transaction => existingUniqueIdentifiers.has(transaction.uniqueIdentifier));

    return { newTransactions, duplicatedTransactions };
  }

  private async insertNewTransactions(transactions: ProductTransactionEntity[]): Promise<ProductTransactionEntity[]> {
    const failedTransactions: ProductTransactionEntity[] = [];

    // Processar em lotes
    for (let i = 0; i < transactions.length; i += this.batchSize) {
      const batch = transactions.slice(i, i + this.batchSize);
      try {
        await this.repository.insert(batch);
      } catch (error) {
        console.error(`Error inserting batch starting with unique identifier ${batch[0].uniqueIdentifier}:`, error);
        failedTransactions.push(...batch); // Adicionar à lista de falhas
      }
    }

    return failedTransactions;
  }

  private createHandleResult(
    newTransactions: ProductTransactionEntity[],
    duplicatedTransactions: ProductTransactionEntity[],
    failedTransactions: ProductTransactionEntity[]
  ): OutputCreateProductTransaction {
    return {
      itemsInserted: {
        size: newTransactions.length - failedTransactions.length 
      },
      itemsDuplicated: {
        size: duplicatedTransactions.length
      },
      itemsFailed: {
        size: failedTransactions.length
      },
      failedTransactions 
    };
  }
}
