import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"

export interface ICreateProductTransactionUseCase {
    handle(input: ProductTransactionEntity[]): Promise<OutputCreateProductTransaction>
}

export interface OutputCreateProductTransaction {
    itemsInserted: {
      size: number;
    };
    itemsDuplicated: {
      size: number;
    };
    itemsFailed: {
      size: number;
    };
    failedTransactions?: ProductTransactionEntity[]; // Inclui a lista de registros que falharam
  }