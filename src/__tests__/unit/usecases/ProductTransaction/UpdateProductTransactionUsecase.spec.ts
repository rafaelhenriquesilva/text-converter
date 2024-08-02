
import { UpdateProductTransactionUseCase } from "../../../../usecases/ProductTransaction/UpdateProductTransactionUsecase"
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransaction-mock"
import { repositoryMock } from "../../mock-repositories/repository-mock"

describe('UpdateProductTransactionUseCase', () => {
  let usecase: UpdateProductTransactionUseCase

  beforeEach(() => {
    usecase = new UpdateProductTransactionUseCase(repositoryMock)
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
    expect(repositoryMock.update).toHaveBeenCalledTimes(1)
  })
    
})