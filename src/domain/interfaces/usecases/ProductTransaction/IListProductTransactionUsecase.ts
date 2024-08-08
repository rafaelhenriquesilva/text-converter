
import { UserOrderDTO } from "../../../dtos/UserOrderDTO"

export interface IListProductTransactionUseCase {
    handle(id?: string): Promise<UserOrderDTO[]>
}

export interface InputListProductTransaction {
    idOrder?: string
    startDate?: string
    endDate?: string
}

