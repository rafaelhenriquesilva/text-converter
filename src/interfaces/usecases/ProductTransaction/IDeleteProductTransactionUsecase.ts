
export interface IDeleteProductTransactionUseCase {
    handle(id: string): Promise<void>
}

