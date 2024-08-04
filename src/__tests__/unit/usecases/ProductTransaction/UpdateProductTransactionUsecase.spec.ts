
import { UpdateProductTransactionUseCase } from "../../../../usecases/ProductTransaction/UpdateProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransactionMock"
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
      clientName: mock.clientName, 
      idProduct: mock.idProduct, 
      productValue: mock.productValue, 
      transactionDate: mock.transactionDate, 
      idUser: mock.idUser, 
      idOrder: mock.idOrder, 

    })
    expect(productTransactionRepositoryMock.update).toHaveBeenCalledTimes(1)
  })
    
})