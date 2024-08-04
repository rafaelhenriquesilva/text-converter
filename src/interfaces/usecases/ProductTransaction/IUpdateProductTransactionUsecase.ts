
export interface IUpdateProductTransactionUseCase {
    handle(input: inputUpdateProductTransaction): Promise<void>
}
export interface inputUpdateProductTransaction {
    id: string
    clientName: string
    idProduct: number
    productValue: number
    transactionDate: Date
    idUser: number
    idOrder: number

}