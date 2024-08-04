
import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"

export interface IFindByIdProductTransactionUseCase {
    handle(id: string): Promise<ProductTransactionEntity | undefined>
}

