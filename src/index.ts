
import { FastifyAdapter } from './infra/adapters/http/FastifyAdapter'
import { CreateProductTransactionDI } from './infra/data-interfaces/ProductTransaction/CreateProductTransactionDI'
import { productTransactionRoutes } from './infra/routes/ProductTransactionRoutes';
import * as dotenv from 'dotenv'

// Carregar o arquivo .env correto com base no NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env_test' : '.env'
dotenv.config({ path: envFile })


const app = new FastifyAdapter()

app.postFile('/upload', async(data) => await CreateProductTransactionDI.init(data))

app.registerRoutes('/api/v1', async () => await productTransactionRoutes(app));

const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})