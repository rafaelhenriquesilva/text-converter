
import { UserOrderDTO } from "../../../dtos/UserOrderDTO"

export interface IListProductTransactionUseCase {
    handle(input: InputListProductTransaction): Promise<UserOrderDTO[]>
}

export interface InputListProductTransaction {
    idOrder?: string
    startDate?: string
    endDate?: string
}

