import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity";

export interface ICreateProductTransactionUseCase {
    handle(input: ProductTransactionEntity[]): Promise<void>
}