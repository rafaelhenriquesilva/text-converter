
import { UpdateProductTransactionUseCase } from "../../../../usecases/ProductTransaction/UpdateProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransaction-mock"
import { productTransactionRepositoryMock } from "../../mock-repositories/product-transaction-repository-mock"

describe('UpdateProductTransactionUseCase', () => {
  let usecase: UpdateProductTransactionUseCase

  beforeEach(() => {
    usecase = new UpdateProductTransactionUseCase(productTransactionRepositoryMock)
  })
                
  it('UpdateProductTransactionUseCase handle', async() => {
    const mock = createProductTransactionMock()
    await usecase.handle({
      id: mock.id, 
      name: mock.name, 
      idProduct: mock.idProduct, 
      productValue: mock.productValue, 
      transactionDate: mock.transactionDate, 
      idUser: mock.idUser, 
      idOrder: mock.idOrder, 

    })
    expect(productTransactionRepositoryMock.update).toHaveBeenCalledTimes(1)
  })
    
})