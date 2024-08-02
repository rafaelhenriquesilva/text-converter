
import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { IDeleteProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IDeleteProductTransactionUsecase"

export class DeleteProductTransactionUseCase implements IDeleteProductTransactionUseCase {
  private repository: GlobalRepositoryInterface<ProductTransactionEntity>

  constructor(
    repository: GlobalRepositoryInterface<ProductTransactionEntity>
  ) {
    this.repository = repository
  }
  async handle(id: string): Promise<void> {
    await this.repository.deleteById(id)
  }
}
