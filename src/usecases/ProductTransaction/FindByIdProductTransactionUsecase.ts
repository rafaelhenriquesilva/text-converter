

import { IFindByIdProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IFindByIdProductTransactionUsecase"
import { IProductTransactionRepository } from "../../interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"

export class FindByIdProductTransactionUseCase implements IFindByIdProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  }
  async handle(id: string): Promise<ProductTransactionEntity | undefined> {
    const result = await this.repository.findById(id)
    if (result.length === 0) return undefined
    return result[0]
  }
} 
