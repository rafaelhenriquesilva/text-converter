

import { ProductTransactionEntity } from "../../../domain/entities/ProductTransactionEntity"
import { IProductTransactionRepository } from "../../../domain/interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { ICreateProductTransactionUseCase } from "../../../domain/interfaces/usecases/ProductTransaction/ICreateProductTransactionUsecase"

export class CreateProductTransactionUseCase implements ICreateProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  } 
  async handle(input: ProductTransactionEntity[]): Promise<void> {
    await this.repository.insert(input)
  }
}