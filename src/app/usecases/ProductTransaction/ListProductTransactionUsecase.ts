
import { IListProductTransactionUseCase, InputListProductTransaction } from "../../../domain/interfaces/usecases/ProductTransaction/IListProductTransactionUsecase"
import { IProductTransactionRepository } from "../../../domain/interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { UserOrderDTO } from "../../../domain/dtos/UserOrderDTO"
import { ProductTransactionMapper } from "./mappers/ProductTransactionMapper"
import { ProductTransactionEntity } from "../../../domain/entities/ProductTransactionEntity"

export class ListProductTransactionUseCase implements IListProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  }
  async handle(input: InputListProductTransaction): Promise<UserOrderDTO[]> {
    let productTransactions: ProductTransactionEntity[] 

    if(input.endDate || input.startDate || input.idOrder) {
      productTransactions = await this.repository.findByCondition({
        idOrder: input.idOrder ? parseInt(input.idOrder) : undefined,
        startDate: input.startDate,
        endDate: input.endDate
      })
    } else {
      productTransactions = await this.repository.listAll()
    }
    
    return ProductTransactionMapper.toBusinessResponse(productTransactions)
  }

}
