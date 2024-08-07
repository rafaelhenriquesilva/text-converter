import { ProductTransactionRow } from "../../../../src/domain/interfaces/usecases/ProductTransaction/IConvertFileToProductTransactionUsecase";
import { ProductTransactionRepository } from "../../../../src/infra/database/pg-promise/repositories/ProductTransactionRepository";
import { ConvertFileService } from "../../../../src/app/services/file-converter/ConvertFileService";
import { ConvertFileToProductTransactionUsecase } from "../../../../src/app/usecases/ProductTransaction/ConvertFileToProductTransactionUsecase";
import { CreateProductTransactionUseCase } from "../../../../src/app/usecases/ProductTransaction/CreateProductTransactionUsecase";
import path from 'path';
import { createProductTransactionMock } from "../../mock-entities/ProductTransaction/ProductTransactionMock";
import { faker } from '@faker-js/faker'

describe('CreateProductTransactionUseCase', () => {
  let productTransactionRepository: ProductTransactionRepository;
  let createProductTransactionUseCase: CreateProductTransactionUseCase;
  let convertFileToProductTransactionUsecase: ConvertFileToProductTransactionUsecase;
  let fileConverter: ConvertFileService<ProductTransactionRow>;
  let filePath: string;

  beforeEach(async () => {
    filePath = path.join(__dirname, '..', '..', '..', 'files', 'data_2.txt');
    fileConverter = new ConvertFileService<ProductTransactionRow>(filePath);
    productTransactionRepository = new ProductTransactionRepository();
    createProductTransactionUseCase = new CreateProductTransactionUseCase(productTransactionRepository, 50); // Limite de 50 registros por lote
    convertFileToProductTransactionUsecase = new ConvertFileToProductTransactionUsecase(fileConverter);
    
    // Limpa o banco de dados antes de cada teste
    await productTransactionRepository.deleteAll();
  });

  it('should insert records in batches', async() => {
    const convertResult = await convertFileToProductTransactionUsecase.handle();
    // Limita a quantidade de registros para 50
    const transactionsToProcess = convertResult.listProductTransaction.slice(0, 50);
    const transactionInformation = await createProductTransactionUseCase.handle(transactionsToProcess);
    expect(transactionInformation.itemsInserted.size).toBe(transactionsToProcess.length);
    expect(transactionInformation.itemsDuplicated.size).toBe(0);
  }, 10000);

  it('should identify duplicated records in batches', async() => {
    const convertResult = await convertFileToProductTransactionUsecase.handle();
    
    // Insere todos os registros inicialmente para ter duplicados
    const transactionsToProcess = convertResult.listProductTransaction.slice(0, 50);
    await createProductTransactionUseCase.handle(transactionsToProcess);
    
    // Roda o caso de uso novamente para identificar duplicados
    const transactionInformation = await createProductTransactionUseCase.handle(transactionsToProcess);
    expect(transactionInformation.itemsInserted.size).toBe(0);
    expect(transactionInformation.itemsDuplicated.size).toBe(transactionsToProcess.length);
  }, 10000);
  it('should insert records in batches and handle failures', async() => {
    const entityToFailed = createProductTransactionMock()
    entityToFailed.clientName =  faker.string.octal({length: 70})
    const transactionInformation = await createProductTransactionUseCase.handle([entityToFailed]);
  
    expect(transactionInformation.itemsInserted.size).toBe(0);
    expect(transactionInformation.itemsDuplicated.size).toBe(0);
    expect(transactionInformation.itemsFailed.size).toBe(1);
  }, 10000);
  afterAll(async () => {
    await productTransactionRepository.deleteAll();
  });
});
