import fs from 'fs/promises'
import path from 'path'
import { ProductTransactionRepository } from './infra/database/pg-promise/repositories/ProductTransactionRepository'
import { CreateProductTransactionUseCase } from './app/usecases/ProductTransaction/CreateProductTransactionUsecase'
import { ConvertFileToProductTransactionUsecase } from './app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase'
import { ProductTransactionRow } from './domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase'
import { ConvertFileService } from './app/services/file-converter/ConvertFileService'
import { FastifyAdapter } from './infra/adapters/http/FastifyAdapter'

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

    const contentStr = await fileConverter.convertFileToJSON()
    const convertResult = await convertFileToProductTransactionUsecase.handle(contentStr)
    await createProductTransactionUseCase.handle(convertResult.listProductTransaction)
    const productTransactions = await productTransactionRepository.listAll()

    await fs.unlink(filePath)

    return {
      body: productTransactions,
      statusCode: 200
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo:', error)
    throw new Error('Erro ao processar o arquivo')
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})