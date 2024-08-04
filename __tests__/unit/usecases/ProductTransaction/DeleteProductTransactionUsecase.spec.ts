
import { DeleteProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/DeleteProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransactionMock"
import { productTransactionRepositoryMock } from "../../mock-repositories/product-transaction-repository-mock"

describe('DeleteProductTransactionUseCase', () => {
  let usecase: DeleteProductTransactionUseCase

  beforeEach(() => {
    usecase = new DeleteProductTransactionUseCase(productTransactionRepositoryMock)
  })
  it('DeleteProductTransactionUseCase handle', async() => {
    const mock = createProductTransactionMock()
    await usecase.handle(mock.id)
    expect(productTransactionRepositoryMock.deleteById).toHaveBeenCalledTimes(1)
  })
})