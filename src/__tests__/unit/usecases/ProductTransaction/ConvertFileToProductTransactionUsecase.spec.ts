
import path from 'path'
import { ConvertFileService } from '../../../../services/file-converter/ConvertFileService'
import { ConvertFileToProductTransactionUsecase } from '../../../../usecases/ProductTransaction/ConvertFileToProductTransactionUsecase'
import { ProductTransactionRow } from '../../../../interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase'

describe('ConvertCsvToEntitieService', () => {
  let usecase: ConvertFileToProductTransactionUsecase
  let fileConverter: ConvertFileService<ProductTransactionRow>

  it('Convert CSV data 1', async() => {
    const filePath = path.join(__dirname, '..', '..', '..', '..', 'files', 'data_1.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    usecase = new ConvertFileToProductTransactionUsecase(fileConverter)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await usecase.handle(dataStr)
    expect(result.listProductTransaction.length).toBe(2352)
    expect(result.listInvalidRecord.length).toBe(0)
  })

  it('Convert CSV data 2', async() => {
    const filePath = path.join(__dirname, '..', '..', '..', '..', 'files', 'data_2.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    usecase = new ConvertFileToProductTransactionUsecase(fileConverter)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await usecase.handle(dataStr)
    expect(result.listProductTransaction.length).toBe(3870)
    expect(result.listInvalidRecord.length).toBe(0)
  })

})
