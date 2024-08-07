import { FieldLineDTO } from "../../../domain/dtos/FieldLineDTO"
import { ProductTransactionEntity } from "../../../domain/entities/ProductTransactionEntity"
import { IConvertFileService } from "../../../domain/interfaces/services/file/IConvertFileService"
import { IConvertFileToProductTransactionUsecase, OutputConvertFileToProductTransaction, ProductTransactionRow } from "../../../domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase"
import { formatStringDateYYYYMMDD } from "../../../infra/util/DateUtil"

/**
 * Caso de uso para converter um arquivo em registros de transação de produtos.
 * 
 * Esta classe utiliza um serviço de conversão de arquivo para transformar o conteúdo de um arquivo em registros
 * de transações de produtos, processa esses registros e lida com a criação de entidades `ProductTransactionEntity`.
 * 
 * @implements IConvertFileToProductTransactionUsecase
 */
export class ConvertFileToProductTransactionUsecase implements IConvertFileToProductTransactionUsecase {

  /**
   * Serviço responsável pela conversão e parsing de arquivos.
   * 
   * @private
   */
  private service: IConvertFileService<ProductTransactionRow>

  /**
   * Construtor para a classe `ConvertFileToProductTransactionUsecase`.
   * 
   * @param service - Serviço que realiza a conversão de arquivo para objetos.
   */
  constructor(service: IConvertFileService<ProductTransactionRow>) {
    this.service = service
  }

  /**
   * Manipula o processo de conversão de arquivo e criação de entidades `ProductTransactionEntity`.
   * 
   * Lê o arquivo, faz o parsing dos dados, cria objetos `ProductTransactionEntity` e trata registros inválidos.
   * 
   * @returns Um objeto contendo listas de registros inválidos e transações de produtos criadas.
   */
  async handle(): Promise<OutputConvertFileToProductTransaction> {
    const fileFields = this.mappingFileFields()
    const contentStr = await this.service.convertFileToJSON(fileFields)
    const listProductTransactionRow: ProductTransactionRow[] = await this.service.parseData(contentStr, fileFields)

    let listProductTransaction: ProductTransactionEntity[] = []
    const listInvalidRecord: any[] = []

    for (const row of listProductTransactionRow) {
      try {
        const productTransaction = this.createProductTransactionByRow(row)
        listProductTransaction.push(productTransaction)
      } catch {
        listInvalidRecord.push(row)
      }
    }

    listProductTransaction = this.mergeDuplicateTransactions(listProductTransaction)

    return {
      listInvalidRecord,
      listProductTransaction
    }
  }

  /**
   * Cria uma entidade `ProductTransactionEntity` a partir de uma linha de dados.
   * 
   * @param row - Linha de dados do tipo `ProductTransactionRow`.
   * @returns Uma instância de `ProductTransactionEntity`.
   */
  createProductTransactionByRow(row: ProductTransactionRow): ProductTransactionEntity {
    const clientName = row.clientName.replace(/'/g, `''`)
    const idOrder = parseInt(row.idOrder)
    const idProduct = parseInt(row.idProduct)
    const idUser = parseInt(row.idUser)
    const transactionDate = new Date(formatStringDateYYYYMMDD(row.transactionDate))

    const productTransaction = new ProductTransactionEntity({
      id: '',
      idOrder,
      idProduct,
      idUser,
      clientName,
      productValue: parseFloat(row.valueProduct),
      transactionDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    productTransaction.createUniqueIdentifier()

    return productTransaction
  }

  /**
   * Remove transações duplicadas, somando os valores dos produtos e atualizando a data de modificação.
   * 
   * @param transactions - Lista de transações de produtos a serem processadas.
   * @returns Lista de transações de produtos sem duplicatas.
   */
  mergeDuplicateTransactions(transactions: ProductTransactionEntity[]): ProductTransactionEntity[] {
    const uniqueTransactionsMap: Map<string, ProductTransactionEntity> = new Map()
  
    transactions.forEach(transaction => {
      const existingTransaction = uniqueTransactionsMap.get(transaction.uniqueIdentifier)
  
      if (existingTransaction) {
        existingTransaction.productValue += transaction.productValue
        existingTransaction.updatedAt = new Date() 
      } else {
        uniqueTransactionsMap.set(transaction.uniqueIdentifier, new ProductTransactionEntity({
          clientName: transaction.clientName, 
          idProduct: transaction.idProduct, 
          productValue: transaction.productValue, 
          createdAt: transaction.createdAt, 
          transactionDate: transaction.transactionDate, 
          updatedAt: transaction.updatedAt, 
          idUser: transaction.idUser, 
          id: transaction.id, 
          idOrder: transaction.idOrder, 
        }))
      }
    })
  
    return Array.from(uniqueTransactionsMap.values())
  }

  /**
   * Mapeia os campos do arquivo com base em índices de início e fim.
   * 
   * @returns Lista de campos mapeados para leitura dos dados do arquivo.
   */
  mappingFileFields(): FieldLineDTO[] {
    return [
      { name: 'idUser', startIndex: 0, endIndex: 10 },
      { name: 'clientName', startIndex: 10, endIndex: 55 },
      { name: 'idOrder', startIndex: 55, endIndex: 65 },
      { name: 'idProduct', startIndex: 65, endIndex: 75 },
      { name: 'valueProduct', startIndex: 75, endIndex: 87 },
      { name: 'transactionDate', startIndex: 87, endIndex: 95 },
    ]
  }
}
