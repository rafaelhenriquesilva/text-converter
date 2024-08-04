
import path from 'path'
import { FileConverterService } from '../../../../services/file-converter/FileConverterService'
import { ConvertFileToProductTransactionUsecase } from '../../../../usecases/ProductTransaction/ConvertFileToProductTransactionUsecase'
import { ProductTransactionRow } from '../../../../interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase'

describe('ConvertCsvToEntitieService', () => {
  let usecase: ConvertFileToProductTransactionUsecase
  let fileConverter: FileConverterService<ProductTransactionRow>

  it('Convert CSV data 1', async() => {
    const filePath = path.join(__dirname, '..', '..', '..', '..', 'files', 'data_1.txt')
    fileConverter = new FileConverterService<ProductTransactionRow>(filePath)
    usecase = new ConvertFileToProductTransactionUsecase(fileConverter)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await usecase.handle(dataStr)
    expect(result.listProductTransaction.length).toBe(2352)
    expect(result.listInvalidRecord.length).toBe(0)
  })

  it('Convert CSV data 2', async() => {
    const filePath = path.join(__dirname, '..', '..', '..', '..', 'files', 'data_2.txt')
    fileConverter = new FileConverterService<ProductTransactionRow>(filePath)
    usecase = new ConvertFileToProductTransactionUsecase(fileConverter)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await usecase.handle(dataStr)
    expect(result.listProductTransaction.length).toBe(3870)
    expect(result.listInvalidRecord.length).toBe(0)
  })

})
