import { CreateProductTransactionDI } from '../../infra/data-interfaces/ProductTransaction/CreateProductTransactionDI';
import { FastifyAdapter } from '../adapters/http/FastifyAdapter';
import { DeleteProductTransactionDI } from '../data-interfaces/ProductTransaction/DeleteProductTransactionDI';
import { ListProductTransactionDI } from '../data-interfaces/ProductTransaction/ListProductTransactionDI';

export async function productTransactionRoutes(app: FastifyAdapter) {
  app.postFile('/product-transaction/file', async (data) => await CreateProductTransactionDI.init(data), {
    schema: {
      tags: ['Product Transactions'],
      summary: 'Upload a product transaction file',
      description: 'Uploads a file containing product transactions.',
      consumes: ['multipart/form-data']
    }
  });

  app.get('/product-transaction', async(data) => await ListProductTransactionDI.init(data), {
    schema: {
      tags: ['Product Transactions'],
      summary: 'List product transactions',
      description: 'Returns a list of all product transactions.',
      querystring: {
        type: 'object',
        properties: {
          startDate: { type: 'string', format: 'date', description: 'The start date for filtering transactions (optional).' },
          endDate: { type: 'string', format: 'date', description: 'The end date for filtering transactions (optional).' },
          idOrder: { type: 'number', description: 'Order ID to filter transactions (optional).' }
        },
        required: [] 
      }
    }
  });

  app.delete('/product-transaction/all',  async() => await DeleteProductTransactionDI.init(),
{
  schema: {
    tags: ['Product Transactions'],
    summary: 'Delete all product transactions',
    description: 'Deletes all product transactions in the system.'
  }
});
}
