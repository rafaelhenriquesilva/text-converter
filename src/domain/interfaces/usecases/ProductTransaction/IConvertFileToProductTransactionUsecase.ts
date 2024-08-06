import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"

export interface IConvertFileToProductTransactionUsecase {
    handle(): Promise<OutputConvertFileToProductTransaction>
}

export interface OutputConvertFileToProductTransaction {
    listProductTransaction: ProductTransactionEntity[]
    listInvalidRecord: any[]
}

export interface ProductTransactionRow {
    idUser: string;
    clientName: string;
    idOrder: string;
    idProduct: string;
    valueProduct: string;
    transactionDate: string;
}
