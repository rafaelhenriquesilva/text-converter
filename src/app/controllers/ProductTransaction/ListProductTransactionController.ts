import { IHttpResponse } from "../../@shared/http/IHttpResponse"
import { badRequest, ok } from "../../@shared/http/responses/HttpResponses"
import { ListProductTransactionUseCase } from "../../usecases/ProductTransaction/ListProductTransactionUsecase"

export default class ListProductTransactionController {
    listProductTransactionUseCase: ListProductTransactionUseCase

    constructor(
        listProductTransactionUseCase: ListProductTransactionUseCase,
    ) {
        this.listProductTransactionUseCase = listProductTransactionUseCase
    }

    async execute(request: any): Promise<IHttpResponse> {
        try {
            const result = await this.listProductTransactionUseCase.handle(request)

            return ok(result)
        } catch (error: any) {
            return badRequest({
                message: error.message
            })
        }
    }
}