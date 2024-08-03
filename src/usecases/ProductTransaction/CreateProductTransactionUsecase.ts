

import { IProductTransactionRepository } from "../../interfaces/repositories/ProductTransaction/IProductTransactionRepository"
import { ICreateProductTransactionUseCase, inputCreateProductTransaction } from "../../interfaces/usecases/ProductTransaction/ICreateProductTransactionUsecase"

export class CreateProductTransactionUseCase implements ICreateProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  } 
  async handle(input: inputCreateProductTransaction): Promise<void> {
    await this.repository.insert({
      name: input.name, 
      idProduct: input.idProduct, 
      productValue: input.productValue, 
      transactionDate: input.transactionDate, 
      idUser: input.idUser, 
      idOrder: input.idOrder, 

    })
  }
}