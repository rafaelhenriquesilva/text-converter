
import { FindByIdProductTransactionUseCase } from "../../../../usecases/ProductTransaction/FindByIdProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransactionMock"
import { productTransactionRepositoryMock } from "../../mock-repositories/product-transaction-repository-mock"

describe('FindByIdProductTransactionUseCase', () => {
  let usecase: FindByIdProductTransactionUseCase

  beforeEach(() => {
    usecase = new FindByIdProductTransactionUseCase(productTransactionRepositoryMock)
  })
  it('FindByIdProductTransactionUseCase handle', async() => {
    const mock = createProductTransactionMock()
    productTransactionRepositoryMock.findById.mockResolvedValue([mock])
    await usecase.handle(mock.id)

    expect(productTransactionRepositoryMock.findById).toHaveBeenCalledTimes(1)
  })
})