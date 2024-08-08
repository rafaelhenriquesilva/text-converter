import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"
import { IGlobalRepository } from "../IGlobalRepository"

export interface IProductTransactionRepository extends IGlobalRepository<ProductTransactionEntity> {
    findByParameters(input: Partial<ProductTransactionEntity>): Promise<ProductTransactionEntity[]>
    findByUniqueIdentifiers(uniqueIdentifiers: string[]): Promise<ProductTransactionEntity[]>
    deleteAll(): Promise<void>
    findByCondition(input: {
        idOrder?: number
        startDate?: string
        endDate?: string
    }): Promise<ProductTransactionEntity[]>
}