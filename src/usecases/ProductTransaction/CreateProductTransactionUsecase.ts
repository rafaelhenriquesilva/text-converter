
import {GlobalRepositoryInterface} from '../../interfaces/repositories/GlobalRepositoryInterface'
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { ICreateProductTransactionUseCase, inputCreateProductTransaction } from "../../interfaces/usecases/ProductTransaction/ICreateProductTransactionUsecase"

export class CreateProductTransactionUseCase implements ICreateProductTransactionUseCase {
  private repository: GlobalRepositoryInterface<ProductTransactionEntity>

  constructor(
    repository: GlobalRepositoryInterface<ProductTransactionEntity>
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