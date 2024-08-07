
import { createProductTransactionMock } from "../mock-entities/ProductTransaction/ProductTransactionMock"
            
describe('Generate a Entity ProductTransaction', () => {
  it('should be entity values', async() => {
    const entity = createProductTransactionMock()
    entity.createUniqueIdentifier()
    expect(entity.toJson()).toEqual({
      clientName: entity.clientName, 
      idProduct: entity.idProduct, 
      productValue: entity.productValue, 
      createdAt: entity.createdAt, 
      transactionDate: entity.transactionDate, 
      uniqueIdentifier: entity.uniqueIdentifier,
      updatedAt: entity.updatedAt, 
      idUser: entity.idUser, 
      id: entity.id, 
      idOrder: entity.idOrder, 
    })
  })
})