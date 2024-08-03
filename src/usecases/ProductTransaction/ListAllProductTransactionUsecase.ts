
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { IListAllProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IListAllProductTransactionUsecase"
import { IProductTransactionRepository } from "../../interfaces/repositories/ProductTransaction/IProductTransactionRepository"

export class ListAllProductTransactionUseCase implements IListAllProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  }
  async handle(): Promise<ProductTransactionEntity[]> {
    const result = await this.repository.listAll()
    return result
  }
}
