
export interface ICreateProductTransactionUseCase {
    handle(input: inputCreateProductTransaction): Promise<void>
}
export interface inputCreateProductTransaction {
    name: string
    idProduct: string
    productValue: number
    transactionDate: Date
    idUser: string
    idOrder: string

}