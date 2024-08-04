
import { ListAllProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/ListAllProductTransactionUsecase"
import { productTransactionRepositoryMock } from "../../mock-repositories/product-transaction-repository-mock"

describe('ListAllProductTransactionUseCase', () => {
  let usecase: ListAllProductTransactionUseCase

  beforeEach(() => {
    usecase = new ListAllProductTransactionUseCase(productTransactionRepositoryMock)
  })
  it('ListAllProductTransactionUseCase handle', async() => {
    await usecase.handle()

    expect(productTransactionRepositoryMock.listAll).toHaveBeenCalledTimes(1)
  })
})