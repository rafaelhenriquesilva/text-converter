
import { ProductTransactionEntity } from '../../../entities/ProductTransactionEntity'
import { ProductTransactionRepository } from '../../../repositories/ProductTransactionRepository'
import { createProductTransactionMock } from '../../unit/mock-entities/ProductTransaction/ProductTransaction-mock'
        

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
    const result = await repository.insert(data)
    dataId = result && result.length > 0 && typeof result[0]?.id == 'string' ? result[0]?.id : '' 
    expect(result[0]?.id).toBeDefined()
  }, 15000)

  it('ProductTransactionRepository Update', async() => {
    mockToUpdate = createProductTransactionMock()
    await repository.update({
      id: dataId,
      name: mockToUpdate.name, 
      idProduct: mockToUpdate.idProduct, 
      productValue: mockToUpdate.productValue, 
      transactionDate: mockToUpdate.transactionDate, 
      idUser: mockToUpdate.idUser, 
      idOrder: mockToUpdate.idOrder, 
    })
  })

                
  it('ProductTransactionRepository Find By Id', async() => {
    const result = await repository.findById(dataId)
    expect(result.length).toBe(1)
    expect(result[0].name).toBe(mockToUpdate.name) 
    expect(result[0].idProduct).toBe(mockToUpdate.idProduct) 
    expect(result[0].productValue).toBe(mockToUpdate.productValue) 
    //expect(result[0].transactionDate).toBe(mockToUpdate.transactionDate) 
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
        