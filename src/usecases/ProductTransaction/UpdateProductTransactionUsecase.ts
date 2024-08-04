import { inputUpdateProductTransaction, IUpdateProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IUpdateProductTransactionUsecase"
import { IProductTransactionRepository } from '../../interfaces/repositories/ProductTransaction/IProductTransactionRepository'

export class UpdateProductTransactionUseCase implements IUpdateProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  }async handle(input: inputUpdateProductTransaction): Promise<void> {
    await this.repository.update({
      id: input.id, 
      clientName: input.clientName, 
      idProduct: input.idProduct, 
      productValue: input.productValue, 
      transactionDate: input.transactionDate, 
      idUser: input.idUser, 
      idOrder: input.idOrder, 

    })
  }}