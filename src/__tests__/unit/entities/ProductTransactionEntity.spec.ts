
import { createProductTransactionMock } from "../mock-entities/ProductTransaction/ProductTransaction-mock"
            
describe('Generate a Entity ProductTransaction', () => {
  it('should be entity values', async() => {
    const entity = createProductTransactionMock()
    expect(entity.toJson()).toEqual({
      name: entity.name, 
      idProduct: entity.idProduct, 
      productValue: entity.productValue, 
      createdAt: entity.toJson().createdAt, 
      transactionDate: entity.transactionDate, 
      updatedAt: entity.toJson().updatedAt, 
      idUser: entity.idUser, 
      id: entity.id, 
      idOrder: entity.idOrder, 

    })
  })
})