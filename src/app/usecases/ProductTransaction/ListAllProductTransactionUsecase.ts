
import { ProductTransactionEntity } from "../../../domain/entities/ProductTransactionEntity"
import { IListAllProductTransactionUseCase } from "../../../domain/interfaces/usecases/ProductTransaction/IListAllProductTransactionUsecase"
import { IProductTransactionRepository } from "../../../domain/interfaces/repositories/ProductTransaction/IProductTransactionRepository"

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
