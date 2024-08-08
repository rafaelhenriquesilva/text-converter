
import { IListProductTransactionUseCase } from "../../../domain/interfaces/usecases/ProductTransaction/IListProductTransactionUsecase"
import { IProductTransactionRepository } from "../../../domain/interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { UserOrderDTO } from "../../../domain/dtos/UserOrderDTO"
import { ProductTransactionMapper } from "./mappers/ProductTransactionMapper"

export class ListProductTransactionUseCase implements IListProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  }
  async handle(): Promise<UserOrderDTO[]> {
    const productTransactions = await this.repository.listAll()
    return ProductTransactionMapper.toBusinessResponse(productTransactions)
  }

}
