import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"
import { IGlobalRepository } from "../IGlobalRepository"

export interface IProductTransactionRepository extends IGlobalRepository<ProductTransactionEntity> {
    findByParameters(input: Partial<ProductTransactionEntity>): Promise<ProductTransactionEntity[]>
    deleteAll(): Promise<void>
}