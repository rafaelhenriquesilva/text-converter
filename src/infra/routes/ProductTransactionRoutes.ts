
import { CreateProductTransactionDI } from '../../infra/data-interfaces/ProductTransaction/CreateProductTransactionDI';
import { FastifyAdapter } from '../adapters/http/FastifyAdapter';

export async function productTransactionRoutes(app: FastifyAdapter) {
    app.postFile('/product-transaction/file', async(data) => await CreateProductTransactionDI.init(data))
}
