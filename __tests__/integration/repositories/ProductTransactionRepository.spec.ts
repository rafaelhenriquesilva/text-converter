
import { ProductTransactionEntity } from '../../../src/domain/entities/ProductTransactionEntity'
import { ProductTransactionRepository } from '../../../src/infra/database/pg-promise/repositories/ProductTransactionRepository'
import { createProductTransactionMock } from '../../unit/mock-entities/ProductTransaction/ProductTransactionMock'
        

describe('ProductTransactionRepository Actions', () => {
  let repository: ProductTransactionRepository
  let dataId: string
  let data: ProductTransactionEntity
  let mockToUpdate: ProductTransactionEntity
  beforeAll(async() => {
    data = createProductTransactionMock()
    repository = new ProductTransactionRepository()
  })

  it('ProductTransactionRepository Insert', async() => {
    await repository.insert([data])
    const itemInserted = await repository.findByParameters({
      clientName: data.clientName,
      productValue: data.productValue,
      idUser: data.idUser,
      idProduct: data.idProduct,
      idOrder: data.idOrder
    })
    
    dataId = itemInserted && itemInserted.length > 0 && typeof itemInserted[0]?.id == 'string' ? itemInserted[0]?.id : '' 
    expect(itemInserted[0]?.id).toBeDefined()
  }, 15000)

  it('ProductTransactionRepository Find By Unique identifier', async() => {
    const result = await repository.findByUniqueIdentifiers([data.uniqueIdentifier])
    expect(result.length).toBe(1)
    expect(result[0].clientName).toBe(data.clientName) 
    expect(result[0].idProduct).toBe(data.idProduct) 
    expect(result[0].productValue).toBe(data.productValue) 
    expect(result[0].idUser).toBe(data.idUser) 
    expect(result[0].idOrder).toBe(data.idOrder) 

  })

  it('ProductTransactionRepository Update', async() => {
    mockToUpdate = createProductTransactionMock()
    await repository.update({
      id: dataId,
      clientName: mockToUpdate.clientName, 
      idProduct: mockToUpdate.idProduct, 
      productValue: mockToUpdate.productValue, 
      idUser: mockToUpdate.idUser, 
      idOrder: mockToUpdate.idOrder, 
    })
  })

  it('ProductTransactionRepository Find By Id', async() => {
    const result = await repository.findById(dataId)
    console.info(result[0].uniqueIdentifier)
    expect(result.length).toBe(1)
    expect(result[0].clientName).toBe(mockToUpdate.clientName) 
    expect(result[0].idProduct).toBe(mockToUpdate.idProduct) 
    expect(result[0].productValue).toBe(mockToUpdate.productValue) 
    expect(result[0].idUser).toBe(mockToUpdate.idUser) 
    expect(result[0].idOrder).toBe(mockToUpdate.idOrder) 

  })

  it('ProductTransactionRepository List All', async() => {
    const result = await repository.listAll()
    expect(result.length > 0).toBe(true)
  })

  it('ProductTransactionRepository Delete', async() => {
    await repository.deleteById(dataId)
                    
    const result = await repository.findById(dataId)
                
    expect(result.length).toBe(0)
                    
  })

})
        