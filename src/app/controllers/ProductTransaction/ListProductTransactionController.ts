import { IHttpResponse } from "../../@shared/http/IHttpResponse"
import { badRequest, ok } from "../../@shared/http/responses/HttpResponses"
import { ListProductTransactionUseCase } from "../../usecases/ProductTransaction/ListProductTransactionUsecase"

export default class CreateProductTransactionController {
    listProductTransactionUseCase: ListProductTransactionUseCase

    constructor(
        listProductTransactionUseCase: ListProductTransactionUseCase,
    ) {
        this.listProductTransactionUseCase = listProductTransactionUseCase
    }

    async execute(): Promise<IHttpResponse> {
        try {
            const result = await this.listProductTransactionUseCase.handle()

            return ok(result)
        } catch (error: any) {
            return badRequest({
                message: error.message
            })
        }
    }
}