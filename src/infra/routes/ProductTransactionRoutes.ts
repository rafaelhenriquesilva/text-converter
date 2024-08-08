
import { CreateProductTransactionDI } from '../../infra/data-interfaces/ProductTransaction/CreateProductTransactionDI'
import { FastifyAdapter } from '../adapters/http/FastifyAdapter'
import { DeleteProductTransactionDI } from '../data-interfaces/ProductTransaction/DeleteProductTransactionDI'
import { ListProductTransactionDI } from '../data-interfaces/ProductTransaction/ListProductTransactionDI'

export async function productTransactionRoutes(app: FastifyAdapter) {
  app.postFile('/product-transaction/file', async(data) => await CreateProductTransactionDI.init(data))
  app.get('/product-transaction', async(data) => await ListProductTransactionDI.init(data))
  app.delete('/product-transaction/all', async() => await DeleteProductTransactionDI.init())
}
