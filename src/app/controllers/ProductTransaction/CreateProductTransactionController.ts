import { IHttpResponse } from "../../@shared/http/IHttpResponse"
import { badRequest, ok } from "../../@shared/http/responses/HttpResponses"
import { ConvertFileToProductTransactionUsecase } from "../../usecases/ProductTransaction/ConvertFileToProductTransactionUsecase"
import { CreateProductTransactionUseCase } from "../../usecases/ProductTransaction/CreateProductTransactionUsecase"

export default class CreateProductTransactionController {
  convertFileUseCase: ConvertFileToProductTransactionUsecase
  createProductTransactionUseCase: CreateProductTransactionUseCase

  constructor(
    convertFileUseCase: ConvertFileToProductTransactionUsecase,
    createProductTransactionUseCase: CreateProductTransactionUseCase
  ) {
    this.convertFileUseCase = convertFileUseCase
    this.createProductTransactionUseCase = createProductTransactionUseCase
  }


  async execute(): Promise<IHttpResponse> {
    try {
      const convertResult = await this.convertFileUseCase.handle()
      const productTransactionInformation = await this.createProductTransactionUseCase.handle(convertResult.listProductTransaction)

      return ok({
        itemsInvalid: {
          size: convertResult.listInvalidRecord.length,
          data: convertResult.listInvalidRecord
        },
        itemsInserted: {
          size: productTransactionInformation.itemsInserted.size
        },
       
        itemsDuplicated: productTransactionInformation.itemsDuplicated,
        itemFailed: {
            size: productTransactionInformation.itemsFailed.size,
            data: productTransactionInformation.failedTransactions
        }
      })
    } catch (error: any) {
      return badRequest({
        message: error.message
      })
    }
  }
}