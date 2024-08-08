import { ProductTransactionRepository } from '../../database/pg-promise/repositories/ProductTransactionRepository'
import { IHttpResponse } from '../../../app/@shared/http/IHttpResponse'
import { badRequest } from '../../../app/@shared/http/responses/HttpResponses'
import { ListProductTransactionUseCase } from '../../../app/usecases/ProductTransaction/ListProductTransactionUsecase'
import ListProductTransactionController from '../../../app/controllers/ProductTransaction/ListProductTransactionController'
import { listProductTransactionSchema } from '../../../app/validators/product-transaction-validator'

export class ListProductTransactionDI {
  static async init(data: any): Promise<IHttpResponse> {
    
    try {
        if(data.startDate && !data.endDate || !data.startDate && data.endDate) {
            return badRequest({message: 'parameters startDate e endDate can´t to be separeted'})
        } else if (data.startDate && data.endDate) {
          await listProductTransactionSchema.validate(data);
        }


      const productTransactionRepository = new ProductTransactionRepository()
      const listProductTransactionUseCase = new ListProductTransactionUseCase(productTransactionRepository)
            
      const controller = new ListProductTransactionController(
        listProductTransactionUseCase
      )

      const result = await controller.execute(data)

      return result
    } catch (error: any) {
      return badRequest({ message: error.message })
    }
  }
}