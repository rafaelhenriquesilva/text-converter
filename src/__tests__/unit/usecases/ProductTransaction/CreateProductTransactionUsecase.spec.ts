
import { CreateProductTransactionUseCase } from "../../../../usecases/ProductTransaction/CreateProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransaction-mock"
import { productTransactionRepositoryMock } from "../../mock-repositories/product-transaction-repository-mock"

describe('CreateProductTransactionUseCase', () => {
  let usecase: CreateProductTransactionUseCase

  beforeEach(() => {
    usecase = new CreateProductTransactionUseCase(productTransactionRepositoryMock)
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
    expect(productTransactionRepositoryMock.insert).toHaveBeenCalledTimes(1)
  })
    
})