

import { FieldLineDTO } from "../../../domain/dtos/FieldLineDTO"
import { ProductTransactionEntity } from "../../../domain/entities/ProductTransactionEntity"
import { IConvertFileService } from "../../../domain/interfaces/services/file/IConvertFileService"
import { IConvertFileToProductTransactionUsecase, OutputConvertFileToProductTransaction, ProductTransactionRow } from "../../../domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase"
import { formatStringDateYYYYMMDD } from "../../../infra/util/DateUtil"

export class ConvertFileToProductTransactionUsecase implements IConvertFileToProductTransactionUsecase {
  service: IConvertFileService<ProductTransactionRow>
  constructor(
    service: IConvertFileService<ProductTransactionRow>
  ) {
    this.service = service
  }

  async handle(): Promise<OutputConvertFileToProductTransaction> {
    const fileFields = this.mappingFileFields()
    const contentStr = await this.service.convertFileToJSON(fileFields, 96)
    const listProductTransactionRow: ProductTransactionRow[] = await this.service.parseData(contentStr, fileFields, 96)
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

  createProductTransactionByRow(row: ProductTransactionRow) {
    const clientName = row.clientName.replace(/'/g, `''`)
    const idOrder = parseInt(row.idOrder)
    const idProduct = parseInt(row.idProduct)
    const idUser = parseInt(row.idUser)
    const transactionDate = new Date(formatStringDateYYYYMMDD(row.transactionDate))

    return new ProductTransactionEntity({
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
  }

  mergeDuplicateTransactions(transactions: ProductTransactionEntity[]): ProductTransactionEntity[] {
    const uniqueTransactionsMap: Map<string, ProductTransactionEntity> = new Map();
  
    transactions.forEach(transaction => {
      const existingTransaction = uniqueTransactionsMap.get(transaction.uniqueIdentifier);
  
      if (existingTransaction) {
        existingTransaction.productValue += transaction.productValue;
        existingTransaction.updatedAt = new Date(); 
      } else {
        uniqueTransactionsMap.set(transaction.uniqueIdentifier,  new ProductTransactionEntity({
          clientName: transaction.clientName, 
          idProduct: transaction.idProduct, 
          productValue: transaction.productValue, 
          createdAt: transaction.createdAt, 
          transactionDate: transaction.transactionDate, 
          updatedAt: transaction.updatedAt, 
          idUser: transaction.idUser, 
          id: transaction.id, 
          idOrder: transaction.idOrder, 
        }));
      }
    });
  
    return Array.from(uniqueTransactionsMap.values());
  }


  mappingFileFields() {
    const fields: FieldLineDTO[] = [
      { name: 'idUser', startIndex: 0, endIndex: 10},
      { name: 'clientName', startIndex: 10, endIndex: 55 },
      { name: 'idOrder', startIndex: 55, endIndex: 65},
      { name: 'idProduct', startIndex: 65, endIndex: 75},
      { name: 'valueProduct', startIndex: 75, endIndex: 87},
      { name: 'transactionDate', startIndex: 87, endIndex: 95 },
    ]

    return fields
  }



}