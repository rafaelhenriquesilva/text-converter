import { IHttpResponse } from "../../@shared/http/IHttpResponse"
import { badRequest, ok } from "../../@shared/http/responses/HttpResponses"
import { DeleteProductTransactionUseCase } from "../../usecases/ProductTransaction/DeleteProductTransactionUsecase"

export default class DeleteProductTransactionController {
  useCase: DeleteProductTransactionUseCase

  constructor(
    useCase: DeleteProductTransactionUseCase,
  ) {
    this.useCase = useCase
  }

  async execute(): Promise<IHttpResponse> {
    try {
      const result = await this.useCase.handle()

      return ok(result)
    } catch (error: any) {
      return badRequest({
        message: error.message
      })
    }
  }
}