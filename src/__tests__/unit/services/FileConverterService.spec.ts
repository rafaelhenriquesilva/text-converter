
import path from 'path'
import { FileConverterService } from '../../../services/file-converter/FileConverterService'
import { FieldLineDTO } from '../../../dto/FieldLineDTO'
import { formatStringDateYYYYMMDD } from '../../../util/date-util'

interface ProductTransactionRow {
  idUser: number;
  name: string;
  idOrder: number;
  idProduct: number;
  valueProduct: number;
  boughtDate: string;
}

describe('ConvertCsvToEntitieService', () => {
  let fileConverter: FileConverterService<ProductTransactionRow>
  let fields: FieldLineDTO[]

  beforeAll(() => {
    fields = [
      { name: 'idUser', startIndex: 0, endIndex: 10, action: parseInt },
      { name: 'name', startIndex: 10, endIndex: 55, action: null },
      { name: 'idOrder', startIndex: 55, endIndex: 65, action: parseInt },
      { name: 'idProduct', startIndex: 65, endIndex: 75, action: parseInt },
      { name: 'valueProduct', startIndex: 75, endIndex: 87, action: parseInt },
      { name: 'transactionDate', startIndex: 87, endIndex: 95, action: formatStringDateYYYYMMDD },
    ]
  })
  it('Convert CSV data 1', async() => {
    const filePath = path.join(__dirname, '..', '..', '..', 'files', 'data_1.txt')
    fileConverter = new FileConverterService<ProductTransactionRow>(filePath)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await fileConverter.parseData(dataStr, fields, 95)
    expect(result).toBeDefined()
  })

  it('Convert CSV data 2', async() => {
    const filePath = path.join(__dirname, '..', '..', '..', 'files', 'data_2.txt')
    fileConverter = new FileConverterService<ProductTransactionRow>(filePath)
    const dataStr = await fileConverter.convertFileToJSON()
    const result = await fileConverter.parseData(dataStr, fields, 95)

    expect(result).toBeDefined()
  })
})
