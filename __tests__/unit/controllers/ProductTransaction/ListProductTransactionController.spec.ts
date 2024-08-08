import ListProductTransactionController from "../../../../src/app/controllers/ProductTransaction/ListProductTransactionController"
import { ListProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/ListProductTransactionUsecase"
import { ProductTransactionRepository } from "../../../../src/infra/database/pg-promise/repositories/ProductTransactionRepository"
describe('List Product Transaction Controller', () => {
  let controller: ListProductTransactionController
  let productTransactionRepository : ProductTransactionRepository
  let useCase: ListProductTransactionUseCase
  beforeAll(() => {
    productTransactionRepository = new ProductTransactionRepository()
    useCase = new ListProductTransactionUseCase(productTransactionRepository)
    controller = new ListProductTransactionController(useCase)
  })
  it('should to request with success', async() => {
    const result = await controller.execute({})

    expect(result.statusCode).toBe(200)
  }, 15000)

})