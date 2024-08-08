import { ProductTransactionRow } from "../../../../src/domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase"
import { ProductTransactionRepository } from "../../../../src/infra/database/pg-promise/repositories/ProductTransactionRepository"
import { ConvertFileService } from "../../../../src/app/services/file-converter/ConvertFileService"
import { ConvertFileToProductTransactionUsecase } from "../../../../src/app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase"
import { CreateProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/CreateProductTransactionUsecase"
import path from 'path'
import { ListProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/ListProductTransactionUsecase"

describe('ListProductTransactionUseCase', () => {
  let productTransactionRepository: ProductTransactionRepository
  let createProductTransactionUseCase: CreateProductTransactionUseCase
  let lisProductTransactionUseCase: ListProductTransactionUseCase
  let convertFileToProductTransactionUsecase: ConvertFileToProductTransactionUsecase
  let fileConverter: ConvertFileService<ProductTransactionRow>
  let filePath: string

  beforeEach(async() => {
    filePath = path.join(__dirname, '..', '..', '..', 'files', 'data_small.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    productTransactionRepository = new ProductTransactionRepository()
    createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository, 50) // Limite de 50 registros por lote
    convertFileToProductTransactionUsecase = new ConvertFileToProductTransactionUsecase(fileConverter)
    lisProductTransactionUseCase = new ListProductTransactionUseCase(productTransactionRepository)
    // Limpa o banco de dados antes de cada teste
    await productTransactionRepository.deleteAll()
  })

  it('should insert records in batches and List ', async() => {
    const convertResult = await convertFileToProductTransactionUsecase.handle()
    const transactionsToProcess = convertResult.listProductTransaction.slice(0, 50)
    await createProductTransactionUseCase.handle(transactionsToProcess)
    
    const userOrders = await lisProductTransactionUseCase.handle({})

    for (const userOrder of userOrders) {
      expect(userOrder.orders.length > 0).toBe(true)
    }
  }, 10000)

})
