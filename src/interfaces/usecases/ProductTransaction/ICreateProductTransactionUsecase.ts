
export interface ICreateProductTransactionUseCase {
    handle(input: inputCreateProductTransaction): Promise<void>
}
export interface inputCreateProductTransaction {
    name: string
    idProduct: number
    productValue: number
    transactionDate: Date
    idUser: number
    idOrder: number

}