
import { DeleteProductTransactionUseCase } from "../../../../usecases/ProductTransaction/DeleteProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransaction-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('DeleteProductTransactionUseCase', () => {
  let usecase: DeleteProductTransactionUseCase

  beforeEach(() => {
    usecase = new DeleteProductTransactionUseCase(repositoryMock)
  })
  it('DeleteProductTransactionUseCase handle', async() => {
    const mock = createProductTransactionMock()
    await usecase.handle(mock.id)
    expect(repositoryMock.deleteById).toHaveBeenCalledTimes(1)
  })
})