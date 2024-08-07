import { FieldLineDTO } from "../../../domain/dtos/FieldLineDTO"
import {promises}  from 'fs'
import { IConvertFileService } from "../../../domain/interfaces/services/file/IConvertFileService"

/**
 * Serviço responsável pela conversão de arquivos e transformação de dados em objetos JSON.
 * 
 * Esta classe facilita a leitura de um arquivo e a conversão de seu conteúdo para um formato JSON.
 * Além disso, permite a análise dos dados do arquivo com base em campos e tamanhos de linha específicos.
 * 
 * @template T - Tipo dos objetos resultantes da conversão e parsing dos dados.
 * 
 * Exemplo de uso:
 * ```typescript
 * const service = new ConvertFileService<MyType>('/path/to/file.txt');
 * const jsonData = await service.convertFileToJSON();
 * const objects = await service.parseData(jsonData, fields, lineLength);
 * ```
 */
export class ConvertFileService<T> implements IConvertFileService<T> {
  
  /**
   * Caminho para o arquivo a ser lido e convertido.
   * 
   * @private
   */
  constructor(private filePath: string) {}
  
  /**
   * Lê o conteúdo do arquivo especificado e retorna como uma string.
   * 
   * @returns Uma promessa que resolve com o conteúdo do arquivo em formato de string.
   * @throws Lança um erro caso haja um problema ao ler o arquivo.
   */
  async convertFileToJSON(): Promise<string> {
    try {
      const data = await promises.readFile(this.filePath, 'utf8');
      return data;
    } catch (err) {
      console.error('Erro ao ler o arquivo:', err);
      throw err;
    }
  }
  
  /**
   * Analisa os dados de uma string para transformá-los em uma lista de objetos do tipo T.
   * 
   * @param data - Conteúdo do arquivo como uma string.
   * @param fields - Definições de campos a serem extraídos dos dados, incluindo índices de início e fim.
   * @param lineLength - Comprimento esperado de cada linha no arquivo.
   * @returns Uma promessa que resolve com uma lista de objetos do tipo T.
   */
  async parseData(data: string, fields: FieldLineDTO[], lineLength: number): Promise<T[]> {
    // Divide o conteúdo do arquivo em linhas, removendo linhas vazias e com comprimento diferente do esperado
    const lines = data.split('\n').filter((line) => {
      return line.trim() !== '' && line.length === lineLength;
    });

    // Lista para armazenar os objetos resultantes
    const listObject: T[] = [];
    
    for (const line of lines) {
      const obj: any = {};
  
      // Cria um objeto a partir dos campos definidos e dos dados da linha
      for(const field of fields) {
        obj[field.name] = line.slice(field.startIndex, field.endIndex);
      }
  
      // Remove espaços em branco dos valores do objeto
      for(const [key, value] of Object.entries(obj)) {
        obj[key] = typeof value === 'string' ? value.trim() : value;
      }
  
      // Adiciona o objeto à lista de resultados
      listObject.push(obj);
    }
  
    return listObject;
  }
}
