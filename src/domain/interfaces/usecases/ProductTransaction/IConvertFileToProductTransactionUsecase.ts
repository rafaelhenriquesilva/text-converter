import { ProductTransactionEntity } from "../../../entities/ProductTransactionEntity"

export interface IConvertFileToProductTransactionUsecase {
    handle(contentStr: string): Promise<OutputConvertFileToProductTransaction>
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
