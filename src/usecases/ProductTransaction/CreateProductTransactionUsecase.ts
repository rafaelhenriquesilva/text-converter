

import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { IProductTransactionRepository } from "../../interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { ICreateProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/ICreateProductTransactionUsecase"

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