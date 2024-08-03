import {promises}  from 'fs'
import path from 'path'

interface ProductTransactionRow {
  idUser: number;
  name: string;
  idOrder: number;
  idProduct: number;
  valueProduct: number;
  boughtDate: string;
}

interface FieldLine {
  startIndex: number
  endIndex: number
  name: string, 
  action: any
}

function formatDate(dateStr: string) {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`
}

class FileConverter<T> {
  constructor(private filePath: string) {}

  async convertFileToJSON(fieldsLine: FieldLine[], lineLenght: number): Promise<T[]> {
    try {
      const data = await promises.readFile(this.filePath, 'utf8')
      return this.parseData(data, fieldsLine, lineLenght)
    } catch (err) {
      console.error('Erro ao ler o arquivo:', err)
      throw err
    }
  }

  private parseData(data: string, fields: FieldLine[], lineLength: number): T[] {
    const lines = data.split('\n').filter(line => line.trim() !== '' && line.length === lineLength)
    const listObject: T[] = []

    for (const line of lines) {
      const obj: any = {}

      for(const field of fields) {
        obj[field.name] = field.action ? field.action(line.slice(field.startIndex, field.endIndex)) : (line.slice(field.startIndex, field.endIndex))
      }

      for( const [key, value] of Object.entries(obj)) {
        obj[key] = typeof value === 'string' ? value.trim() : value
      }


      listObject.push(obj)
    }

    return listObject
  }
}

// Teste
describe('ConvertCsvToEntitieService', () => {
  let fileConverter: FileConverter<ProductTransactionRow>
  let fields:FieldLine[]

  beforeAll(() => {
    fields = [
      {name: 'idUser', startIndex:0, endIndex:10, action: parseInt},
      {name: 'name', startIndex:10, endIndex:55, action: null},
      {name: 'idOrder', startIndex:55, endIndex:65, action: parseInt},
      {name: 'idProduct', startIndex:65, endIndex:75, action: parseInt},
      {name: 'valueProduct', startIndex:75, endIndex:87, action: parseInt},
      {name: 'boughtDate', startIndex:87, endIndex:95, action: formatDate},
    ]
  })
  it('Convert CSV data 1', async() => {
    const filePath = path.join(__dirname, '..', '..', 'files', 'data_1.txt')
    fileConverter = new FileConverter<ProductTransactionRow>(filePath)
    const result = await fileConverter.convertFileToJSON(fields, 95)
    
    expect(result).toBeDefined() 
  })

  it('Convert CSV data 2', async() => {
    const filePath = path.join(__dirname, '..', '..', 'files', 'data_2.txt')
    fileConverter = new FileConverter<ProductTransactionRow>(filePath)
    const result = await fileConverter.convertFileToJSON(fields, 95)

    expect(result).toBeDefined() 
  })
})
