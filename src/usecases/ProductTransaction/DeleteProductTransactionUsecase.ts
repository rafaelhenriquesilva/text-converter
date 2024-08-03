
import { IDeleteProductTransactionUseCase } from "../../interfaces/usecases/ProductTransaction/IDeleteProductTransactionUsecase"
import { IProductTransactionRepository } from "../../interfaces/repositories/ProductTransaction/IProductTransactionRepository"
export class DeleteProductTransactionUseCase implements IDeleteProductTransactionUseCase {
  private repository: IProductTransactionRepository

  constructor(
    repository: IProductTransactionRepository
  ) {
    this.repository = repository
  }
  async handle(id: string): Promise<void> {
    await this.repository.deleteById(id)
  }
}
