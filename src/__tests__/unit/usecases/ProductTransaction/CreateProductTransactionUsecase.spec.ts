
import { CreateProductTransactionUseCase } from "../../../../usecases/ProductTransaction/CreateProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransaction-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('CreateProductTransactionUseCase', () => {
  let usecase: CreateProductTransactionUseCase

  beforeEach(() => {
    usecase = new CreateProductTransactionUseCase(repositoryMock)
  })
  it('CreateProductTransactionUseCase handle', async() => {
    const mock = createProductTransactionMock()
    await usecase.handle({ 
      name: mock.name, 
      idProduct: mock.idProduct, 
      productValue: mock.productValue, 
      transactionDate: mock.transactionDate, 
      idUser: mock.idUser, 
      idOrder: mock.idOrder, 

    })
    expect(repositoryMock.insert).toHaveBeenCalledTimes(1)
  })
    
})