/**
 * @params clientName: Nome do cliente da Transação
 * @params idProduct: Identificador do produto
 * @params idOrder: Identificador do pedido
 * @params idUser: Identificador do usuário
 * @params transactionDate: data da transação
 * @params productValue: valor do produto
 */

export interface ProductTransactionDTO {
    clientName: string
    idProduct: number
    productValue: number
    createdAt: Date
    transactionDate: Date
    updatedAt: Date
    idUser: number
    id: string
    idOrder: number
    uniqueIdentifier:string

}