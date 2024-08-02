
import { ListAllProductTransactionUseCase } from "../../../../usecases/ProductTransaction/ListAllProductTransactionUsecase"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('ListAllProductTransactionUseCase', () => {
  let usecase: ListAllProductTransactionUseCase

  beforeEach(() => {
    usecase = new ListAllProductTransactionUseCase(repositoryMock)
  })
  it('ListAllProductTransactionUseCase handle', async() => {
    await usecase.handle()

    expect(repositoryMock.listAll).toHaveBeenCalledTimes(1)
  })
})