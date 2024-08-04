
import path, { dirname } from 'path'
import { ConvertFileService } from '../../../src/app/services/file-converter/ConvertFileService'
import { FieldLineDTO } from '../../../src/domain/dtos/FieldLineDTO'

interface ProductTransactionRow {
  idUser: number;
  name: string;
  idOrder: number;
  idProduct: number;
  valueProduct: number;
  boughtDate: string;
}

describe('ConvertCsvToEntitieService', () => {
  let fileConverter: ConvertFileService<ProductTransactionRow>
  let fields: FieldLineDTO[]

  beforeAll(() => {
    fields = [
      { name: 'idUser', startIndex: 0, endIndex: 10 },
      { name: 'name', startIndex: 10, endIndex: 55, },
      { name: 'idOrder', startIndex: 55, endIndex: 65 },
      { name: 'idProduct', startIndex: 65, endIndex: 75 },
      { name: 'valueProduct', startIndex: 75, endIndex: 87 },
      { name: 'transactionDate', startIndex: 87, endIndex: 95},
    ]
  })
  it('Convert CSV data 1', async() => {
    const filePath = path.join(__dirname, '..', '..', 'files', 'data_1.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await fileConverter.parseData(dataStr, fields, 95)
    expect(result).toBeDefined()
  })

  it('Convert CSV data 2', async() => {
    const filePath = path.join(__dirname, '..', '..', 'files', 'data_2.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await fileConverter.parseData(dataStr, fields, 95)

    expect(result).toBeDefined()
  })
})
