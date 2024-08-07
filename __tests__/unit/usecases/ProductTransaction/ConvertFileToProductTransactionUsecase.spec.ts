
import path from 'path'
import { ConvertFileService } from '../../../../src/app/services/file-converter/ConvertFileService'
import { ConvertFileToProductTransactionUsecase } from '../../../../src/app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase'
import { ProductTransactionRow } from '../../../../src/domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase'

describe('ConvertCsvToEntitieService', () => {
  let usecase: ConvertFileToProductTransactionUsecase
  let fileConverter: ConvertFileService<ProductTransactionRow>

  it('Convert CSV data 1', async() => {
    const filePath = path.join(__dirname,  '..', '..', '..', 'files', 'data_1.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    usecase = new ConvertFileToProductTransactionUsecase(fileConverter)
    const result = await usecase.handle()
    expect(result.listProductTransaction.length).toBe(2065)
    expect(result.listInvalidRecord.length).toBe(0)
  })

  it('Convert CSV data 2', async() => {
    const filePath = path.join(__dirname,  '..', '..', '..', 'files', 'data_2.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    usecase = new ConvertFileToProductTransactionUsecase(fileConverter)
    const result = await usecase.handle()
    expect(result.listProductTransaction.length).toBe(3431)
    expect(result.listInvalidRecord.length).toBe(0)
  })

})
