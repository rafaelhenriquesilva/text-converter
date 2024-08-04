
import { createProductTransactionMock } from "../mock-entities/ProductTransaction/ProductTransactionMock"
            
describe('Generate a Entity ProductTransaction', () => {
  it('should be entity values', async() => {
    const entity = createProductTransactionMock()
    expect(entity.toJson()).toEqual({
      clientName: entity.clientName, 
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