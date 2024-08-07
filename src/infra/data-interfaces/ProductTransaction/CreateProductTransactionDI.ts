import fs from 'fs/promises'
import path from 'path'
import { ProductTransactionRow } from '../../../domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase'
import { ConvertFileService } from '../../../app/services/file-converter/ConvertFileService'
import { ProductTransactionRepository } from '../../database/pg-promise/repositories/ProductTransactionRepository'
import { CreateProductTransactionUseCase } from '../../../app/usecases/ProductTransaction/CreateProductTransactionUsecase'
import { ConvertFileToProductTransactionUsecase } from '../../../app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase'
import CreateProductTransactionController from '../../../app/controllers/ProductTransaction/CreateProductTransactionController'
import { IHttpResponse } from '../../../app/@shared/http/IHttpResponse'
import { badRequest } from '../../../app/@shared/http/responses/HttpResponses'

export class CreateProductTransactionDI {
  static async init(data: any): Promise<IHttpResponse> {
    let filePath: string

    try {
      if (!data.file) {
        throw new Error('No file uploaded')
      }

      filePath = path.join(__dirname, '..', '..', '..', '..', '..', data.file.path)
      const fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
      const convertFileToProductTransactionUsecase = new ConvertFileToProductTransactionUsecase(fileConverter)
      const productTransactionRepository = new ProductTransactionRepository()
      const createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository)
            
      const controller = new CreateProductTransactionController(
        convertFileToProductTransactionUsecase,
        createProductTransactionUseCase
      )

      const result = await controller.execute()

      await fs.unlink(filePath)

      return result
    } catch (error: any) {
      return badRequest({ message: error.message })
    }
  }
}