
import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { IListAllProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IListAllProductTransactionUsecase"

export class ListAllProductTransactionUseCase implements IListAllProductTransactionUseCase {
  private repository: GlobalRepositoryInterface<ProductTransactionEntity>

  constructor(
    repository: GlobalRepositoryInterface<ProductTransactionEntity>
  ) {
    this.repository = repository
  }
  async handle(): Promise<ProductTransactionEntity[]> {
    const result = await this.repository.listAll()
    return result
  }
}
