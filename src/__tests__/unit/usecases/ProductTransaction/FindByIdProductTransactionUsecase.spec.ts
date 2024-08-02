
import { FindByIdProductTransactionUseCase } from "../../../../usecases/ProductTransaction/FindByIdProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransaction-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('FindByIdProductTransactionUseCase', () => {
  let usecase: FindByIdProductTransactionUseCase

  beforeEach(() => {
    usecase = new FindByIdProductTransactionUseCase(repositoryMock)
  })
  it('FindByIdProductTransactionUseCase handle', async() => {
    const mock = createProductTransactionMock()
    repositoryMock.findById.mockResolvedValue([mock])
    await usecase.handle(mock.id)

    expect(repositoryMock.findById).toHaveBeenCalledTimes(1)
  })
})