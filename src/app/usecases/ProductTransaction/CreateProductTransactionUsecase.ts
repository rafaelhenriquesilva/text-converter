import { ProductTransactionEntity } from "../../../domain/entities/ProductTransactionEntity";
import { IProductTransactionRepository } from "../../../domain/interfaces/repositories/ProductTransaction/IProductTransactionRepository";
import { ICreateProductTransactionUseCase, OutputCreateProductTransaction } from "../../../domain/interfaces/usecases/ProductTransaction/ICreateProductTransactionUsecase";

/**
 * Classe responsável pelo caso de uso de criação de transações de produtos.
 * 
 * Esta classe gerencia a lógica de negócios para a inserção de novas transações de produtos em um repositório,
 * lidando com duplicações e falhas durante o processo. As transações são inseridas em lotes para otimizar a 
 * performance e a eficiência do banco de dados.
 * 
 * Exemplo de uso:
 * ```typescript
 * const useCase = new CreateProductTransactionUseCase(repository);
 * const result = await useCase.handle(transactions);
 * ```
 */
export class CreateProductTransactionUseCase implements ICreateProductTransactionUseCase {
  
  /**
   * Repositório para manipulação de transações de produtos.
   * 
   * @private
   */
  private repository: IProductTransactionRepository;

  /**
   * Tamanho do lote para inserção em massa.
   * 
   * @private
   */
  private batchSize: number;

  /**
   * Construtor da classe.
   * 
   * @param repository - Repositório de transações de produtos.
   * @param batchSize - Número de transações a serem processadas em um único lote. O valor padrão é 50.
   */
  constructor(repository: IProductTransactionRepository, batchSize: number = 50) {
    this.repository = repository;
    this.batchSize = batchSize;
  }

  /**
   * Método principal para processar e inserir transações de produtos.
   * 
   * Este método faz o seguinte:
   * - Extrai identificadores únicos das transações fornecidas.
   * - Verifica quais transações já existem no repositório.
   * - Filtra as transações novas e duplicadas.
   * - Insere as novas transações em lotes.
   * - Retorna o resultado da operação.
   * 
   * @param input - Lista de transações de produtos a serem processadas.
   * @returns Resultado da operação, incluindo o número de transações inseridas, duplicadas e falhas.
   */
  async handle(input: ProductTransactionEntity[]): Promise<OutputCreateProductTransaction> {
    console.info('Starting to handle product transactions...');

    const listUniqueIdentifiers = this.extractUniqueIdentifiers(input);
    console.info('Extracted unique identifiers:', listUniqueIdentifiers.length);

    const existingTransactions = await this.repository.findByUniqueIdentifiers(listUniqueIdentifiers);
    console.info('Existing transactions found:', existingTransactions.length);

    const { newTransactions, duplicatedTransactions } = this.filterTransactions(input, existingTransactions);

    console.info('New transactions to insert:', newTransactions.length);
    console.info('Duplicated transactions:', duplicatedTransactions.length);

    const failedTransactions = await this.insertNewTransactions(newTransactions);

    return this.createHandleResult(newTransactions, duplicatedTransactions, failedTransactions);
  }

  /**
   * Extrai os identificadores únicos das transações fornecidas.
   * 
   * @param transactions - Lista de transações de produtos.
   * @returns Lista de identificadores únicos.
   */
  private extractUniqueIdentifiers(transactions: ProductTransactionEntity[]): string[] {
    return transactions.map(transaction => transaction.uniqueIdentifier);
  }

  /**
   * Filtra as transações para separar novas transações das duplicadas.
   * 
   * @param input - Lista de transações fornecidas.
   * @param existingTransactions - Lista de transações existentes no repositório.
   * @returns Objeto contendo as transações novas e duplicadas.
   */
  private filterTransactions(
    input: ProductTransactionEntity[],
    existingTransactions: ProductTransactionEntity[]
  ): { newTransactions: ProductTransactionEntity[], duplicatedTransactions: ProductTransactionEntity[] } {
    const existingUniqueIdentifiers = new Set(existingTransactions.map(transaction => transaction.uniqueIdentifier));

    const newTransactions = input.filter(transaction => !existingUniqueIdentifiers.has(transaction.uniqueIdentifier));
    const duplicatedTransactions = input.filter(transaction => existingUniqueIdentifiers.has(transaction.uniqueIdentifier));

    return { newTransactions, duplicatedTransactions };
  }

  /**
   * Insere novas transações em lotes.
   * 
   * Em caso de falha na inserção de um lote, as transações desse lote são registradas como falhas.
   * 
   * @param transactions - Lista de transações a serem inseridas.
   * @returns Lista de transações que falharam durante a inserção.
   */
  private async insertNewTransactions(transactions: ProductTransactionEntity[]): Promise<ProductTransactionEntity[]> {
    const failedTransactions: ProductTransactionEntity[] = [];

    // Processar em lotes
    for (let i = 0; i < transactions.length; i += this.batchSize) {
      const batch = transactions.slice(i, i + this.batchSize);
      try {
        await this.repository.insert(batch);
      } catch (error) {
        console.error(`Error inserting batch starting with unique identifier ${batch[0].uniqueIdentifier}:`, error);
        failedTransactions.push(...batch); // Adicionar à lista de falhas
      }
    }

    return failedTransactions;
  }

  /**
   * Cria o resultado da operação com base nas transações processadas.
   * 
   * @param newTransactions - Lista de novas transações inseridas.
   * @param duplicatedTransactions - Lista de transações que já existiam e foram identificadas como duplicadas.
   * @param failedTransactions - Lista de transações que falharam durante a inserção.
   * @returns Objeto contendo o resultado da operação, incluindo número de transações inseridas, duplicadas e falhadas.
   */
  private createHandleResult(
    newTransactions: ProductTransactionEntity[],
    duplicatedTransactions: ProductTransactionEntity[],
    failedTransactions: ProductTransactionEntity[]
  ): OutputCreateProductTransaction {
    return {
      itemsInserted: {
        size: newTransactions.length - failedTransactions.length // Ajusta o tamanho inserido para não incluir falhas
      },
      itemsDuplicated: {
        size: duplicatedTransactions.length
      },
      itemsFailed: {
        size: failedTransactions.length
      },
      failedTransactions // Inclui os registros que falharam
    };
  }
}
