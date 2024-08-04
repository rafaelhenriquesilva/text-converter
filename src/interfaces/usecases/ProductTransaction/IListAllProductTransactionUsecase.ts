
import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"

export interface IListAllProductTransactionUseCase {
    handle(): Promise<ProductTransactionEntity[]>
}

