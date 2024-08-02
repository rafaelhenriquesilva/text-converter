
import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { inputUpdateProductTransaction, IUpdateProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IUpdateProductTransactionUsecase"

export class UpdateProductTransactionUseCase implements IUpdateProductTransactionUseCase {
  private repository: GlobalRepositoryInterface<ProductTransactionEntity>

  constructor(
    repository: GlobalRepositoryInterface<ProductTransactionEntity>
  ) {
    this.repository = repository
  }async handle(input: inputUpdateProductTransaction): Promise<void> {
    await this.repository.update({
      id: input.id, 
      name: input.name, 
      idProduct: input.idProduct, 
      productValue: input.productValue, 
      transactionDate: input.transactionDate, 
      idUser: input.idUser, 
      idOrder: input.idOrder, 

    })
  }}