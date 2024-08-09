
import { FastifyAdapter } from './infra/adapters/http/FastifyAdapter'
import { productTransactionRoutes } from './infra/routes/ProductTransactionRoutes'
import * as dotenv from 'dotenv'

// Carregar o arquivo .env correto com base no NODE_ENV
const envFile = process.env.NODE_ENV === 'test' ? '.env_test' : '.env'
dotenv.config({ path: envFile })


const app = new FastifyAdapter()

app.registerRoutes('', async() => await productTransactionRoutes(app))

const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}, documentation on /docs`)
})