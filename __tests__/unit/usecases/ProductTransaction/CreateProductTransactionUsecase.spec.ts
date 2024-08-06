
import { ProductTransactionRow } from "../../../../src/domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase"
import { ProductTransactionRepository } from "../../../../src/infra/database/pg-promise/repositories/ProductTransactionRepository"
import { ConvertFileService } from "../../../../src/app/services/file-converter/ConvertFileService"
import { ConvertFileToProductTransactionUsecase } from "../../../../src/app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase"
import { CreateProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/CreateProductTransactionUsecase"
import path from 'path'
describe('CreateProductTransactionUseCase', () => {
  let productTransactionRepository: ProductTransactionRepository
  let createProductTransactionUseCase: CreateProductTransactionUseCase
  let convertFileToProductTransactionUsecase: ConvertFileToProductTransactionUsecase
  let fileConverter: ConvertFileService<ProductTransactionRow>
  let filePath: string
  beforeEach(() => {
    filePath = path.join(__dirname,   '..', '..', '..', 'files', 'data_2.txt')
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath)
    productTransactionRepository = new ProductTransactionRepository()
    createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository)
    convertFileToProductTransactionUsecase = new ConvertFileToProductTransactionUsecase(fileConverter)
  })
  it('CreateProductTransactionUseCase handle', async() => {
    const convertResult = await convertFileToProductTransactionUsecase.handle()
    await createProductTransactionUseCase.handle(convertResult.listProductTransaction)
    const productTransactions = await productTransactionRepository.listAll()
    expect(productTransactions.length > 0).toBe(true)
  })

  afterAll(async() => {
    await productTransactionRepository.deleteAll()
  })
    
})