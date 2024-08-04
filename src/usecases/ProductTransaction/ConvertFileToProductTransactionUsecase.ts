

import { FieldLineDTO } from "../../dto/FieldLineDTO"
import { ProductTransactionEntity } from "../../entities/ProductTransactionEntity"
import { IConvertFileService } from "../../interfaces/services/file/IConvertFileService"
import { IConvertFileToProductTransactionUsecase, OutputConvertFileToProductTransaction, ProductTransactionRow } from "../../interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase"
import { formatStringDateYYYYMMDD } from "../../util/date-util"

export class ConvertFileToProductTransactionUsecase implements IConvertFileToProductTransactionUsecase {
    service: IConvertFileService<ProductTransactionRow>
    constructor(
        service: IConvertFileService<ProductTransactionRow>
    ) {
        this.service = service
    }

    async handle(contentStr: string): Promise<OutputConvertFileToProductTransaction> {
        const fileFields = this.mappingFileFields()
        const listProductTransactionRow: ProductTransactionRow[] = await this.service.parseData(contentStr, fileFields, 95)
        const listProductTransaction: ProductTransactionEntity[] = []
        const listInvalidRecord: any[] = []

        for (const row of listProductTransactionRow) {
            try {
                const productTransaction = this.createProductTransactionByRow(row)
                listProductTransaction.push(productTransaction)
            } catch {
                listInvalidRecord.push(row)
            }
        }

        return {
            listInvalidRecord,
            listProductTransaction
        }

    }
    createProductTransactionByRow(row: ProductTransactionRow) {
        return new ProductTransactionEntity({
            id: '',
            idOrder: row.idOrder.toString(),
            idProduct: row.idProduct.toString(),
            idUser: row.idUser.toString(),
            name: row.name,
            productValue: row.valueProduct,
            transactionDate: new Date(row.transactionDate),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }


    mappingFileFields() {
        const fields: FieldLineDTO[] = [
            { name: 'idUser', startIndex: 0, endIndex: 10, action: parseInt },
            { name: 'name', startIndex: 10, endIndex: 55, action: null },
            { name: 'idOrder', startIndex: 55, endIndex: 65, action: parseInt },
            { name: 'idProduct', startIndex: 65, endIndex: 75, action: parseInt },
            { name: 'valueProduct', startIndex: 75, endIndex: 87, action: parseInt },
            { name: 'transactionDate', startIndex: 87, endIndex: 95, action: formatStringDateYYYYMMDD },
        ]

        return fields
    }



}