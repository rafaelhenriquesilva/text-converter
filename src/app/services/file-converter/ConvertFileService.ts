import { FieldLineDTO } from "../../../domain/dtos/FieldLineDTO"
import {promises}  from 'fs'
import { IConvertFileService } from "../../../domain/interfaces/services/file/IConvertFileService"
/**
 * @description Facilitar a Conversão do Arquivo
 */
export class ConvertFileService<T> implements IConvertFileService<T> {
  constructor(private filePath: string) {}
  
  async convertFileToJSON(): Promise<string> {
    try {
      const data = await promises.readFile(this.filePath, 'utf8')
      return data
    } catch (err) {
      console.error('Erro ao ler o arquivo:', err)
      throw err
    }
  }
  
  async parseData(data: string, fields: FieldLineDTO[], lineLength: number): Promise<T[]> {
    const lines = data.split('\n').filter((line) => {
      return line.trim() !== '' && line.length === lineLength
    } )
    const listObject: T[] = []
    for (const line of lines) {
      const obj: any = {}
  
      for(const field of fields) {
        obj[field.name] = line.slice(field.startIndex, field.endIndex)
      }
  
      for( const [key, value] of Object.entries(obj)) {
        obj[key] = typeof value === 'string' ? value.trim() : value
      }
  
  
      listObject.push(obj)
    }
  
    return listObject
  }
}