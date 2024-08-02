
import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { IFindByIdProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IFindByIdProductTransactionUsecase"

export class FindByIdProductTransactionUseCase implements IFindByIdProductTransactionUseCase {
  private repository: GlobalRepositoryInterface<ProductTransactionEntity>

  constructor(
    repository: GlobalRepositoryInterface<ProductTransactionEntity>
  ) {
    this.repository = repository
  }
  async handle(id: string): Promise<ProductTransactionEntity | undefined> {
    const result = await this.repository.findById(id)
    if (result.length === 0) return undefined
    return result[0]
  }
} 
