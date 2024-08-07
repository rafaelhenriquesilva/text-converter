import path from 'path'
import { ProductTransactionRepository } from './infra/database/pg-promise/repositories/ProductTransactionRepository'
import { CreateProductTransactionUseCase } from './app/usecases/ProductTransaction/CreateProductTransactionUsecase'
import { ConvertFileToProductTransactionUsecase } from './app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase'
import { ProductTransactionRow } from './domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase'
import { ConvertFileService } from './app/services/file-converter/ConvertFileService'
import { FastifyAdapter } from './infra/adapters/http/FastifyAdapter'
import CreateProductTransactionController from './app/controllers/ProductTransaction/CreateProductTransactionController'

const app = new FastifyAdapter()

app.postFile('/upload', async(data) => {
  try {
    if (!data.file) {
      throw new Error('No file uploaded')
    }
    
    const filePath = path.join(__dirname, '..', '..', data.file.path)
    const fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    const productTransactionRepository = new ProductTransactionRepository()
    const createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository)
    const convertFileToProductTransactionUsecase = new ConvertFileToProductTransactionUsecase(fileConverter)

    const controller = new CreateProductTransactionController(
      convertFileToProductTransactionUsecase,
      createProductTransactionUseCase
    )

    const result = await controller.execute()

    return result
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error)
    throw new Error('Erro ao processar o arquivo')
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})