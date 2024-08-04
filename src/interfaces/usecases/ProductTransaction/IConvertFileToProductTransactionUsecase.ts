import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"

export interface IConvertFileToProductTransactionUsecase {
    handle(contentStr: string): Promise<OutputConvertFileToProductTransaction>
}

export interface OutputConvertFileToProductTransaction {
    listProductTransaction: ProductTransactionEntity[]
    listInvalidRecord: any[]
}

export interface ProductTransactionRow {
    idUser: number;
    name: string;
    idOrder: number;
    idProduct: number;
    valueProduct: number;
    transactionDate: string;
}
