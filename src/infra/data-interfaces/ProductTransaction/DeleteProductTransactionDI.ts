import { ProductTransactionRepository } from '../../database/pg-promise/repositories/ProductTransactionRepository'
import { IHttpResponse } from '../../../app/@shared/http/IHttpResponse'
import { badRequest } from '../../../app/@shared/http/responses/HttpResponses'
import { DeleteProductTransactionUseCase } from '../../../app/usecases/ProductTransaction/DeleteProductTransactionUsecase'
import DeleteProductTransactionController from '../../../app/controllers/ProductTransaction/DeleteProductTransactionController'

export class DeleteProductTransactionDI {
  static async init(): Promise<IHttpResponse> {

    try {

      const productTransactionRepository = new ProductTransactionRepository()
      const deleteProductTransactionUseCase = new DeleteProductTransactionUseCase(productTransactionRepository)
            
      const controller = new DeleteProductTransactionController(
        deleteProductTransactionUseCase
      )

      const result = await controller.execute()

      return result
    } catch (error: any) {
      return badRequest({ message: error.message })
    }
  }
}