
export interface IUpdateProductTransactionUseCase {
              handle(input: inputUpdateProductTransaction): Promise<void>
          }
export interface inputUpdateProductTransaction { 
id: string 
name: string 
idProduct: string 
productValue: number 
transactionDate: string 
idUser: string 
idOrder: string 

}