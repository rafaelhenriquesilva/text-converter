import CreateProductTransactionController from "../../../../src/app/controllers/ProductTransaction/CreateProductTransactionController"
import { ConvertFileService } from "../../../../src/app/services/file-converter/ConvertFileService"
import { ConvertFileToProductTransactionUsecase } from "../../../../src/app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase"
import { CreateProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/CreateProductTransactionUsecase"
import { ProductTransactionRow } from "../../../../src/domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase"
import { ProductTransactionRepository } from "../../../../src/infra/database/pg-promise/repositories/ProductTransactionRepository"
import path from 'path'
describe('Create Product Transaction Controller', () => {
  let controller: CreateProductTransactionController
  let convertFileToProductTransactionUseCase: ConvertFileToProductTransactionUsecase
  let createProductTransactionUseCase: CreateProductTransactionUseCase
  let convertFileService: ConvertFileService<ProductTransactionRow>
  let productTransactionRepository : ProductTransactionRepository
  beforeAll(() => {
    const filePath = path.join(__dirname, '..', '..', '..', 'files', 'data_1.txt')
    productTransactionRepository = new ProductTransactionRepository()
    convertFileService = new ConvertFileService<ProductTransactionRow>(filePath)
    convertFileToProductTransactionUseCase = new ConvertFileToProductTransactionUsecase(convertFileService)
    createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository)
    controller = new CreateProductTransactionController(
      convertFileToProductTransactionUseCase,
      createProductTransactionUseCase
    )
  })
  it('should to request with success', async() => {
    const result = await controller.execute()

    expect(result.statusCode).toBe(200)
  })

  it('should to request with error to search file', async() => {
    const filePath = path.join(__dirname, 'data_1.txt')
    productTransactionRepository = new ProductTransactionRepository()
    convertFileService = new ConvertFileService<ProductTransactionRow>(filePath)
    convertFileToProductTransactionUseCase = new ConvertFileToProductTransactionUsecase(convertFileService)
    createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository)
    controller = new CreateProductTransactionController(
      convertFileToProductTransactionUseCase,
      createProductTransactionUseCase
    )
    const result = await controller.execute()

    expect(result.statusCode).toBe(400)
  })

  afterAll(async() => {
    await productTransactionRepository.deleteAll()
  })
})