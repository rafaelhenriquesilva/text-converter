
import { formatDateYYYYMMDD } from '../../infra/util/DateUtil'
import { ProductTransactionDTO } from '../dtos/ProductTransactionDTO'
export class ProductTransactionEntity 
{
        
  private _clientName: string 
  
  private readonly _idProduct: number 
  private _productValue: number 
 
  private readonly _createdAt: Date 
  private readonly _transactionDate: Date 
  private _updatedAt: Date 
 
  private readonly _idUser: number 
  private readonly _id: string 
  private readonly _idOrder: number 
  private _uniqueIdentifier: string
  
 

  constructor(dto: Omit<ProductTransactionDTO, 'uniqueIdentifier'>) { 
    this._clientName = dto.clientName 
    this._idProduct = dto.idProduct 
    this._productValue = dto.productValue 
    this._createdAt = dto.createdAt
    this._transactionDate = dto.transactionDate 
    this._updatedAt = dto.updatedAt
    this._idUser = dto.idUser 
    this._id = dto.id 
    this._idOrder = dto.idOrder 
    this._uniqueIdentifier = this.createUniqueIdentifier()
  }

  public get clientName(): string {
    return this._clientName
  } 

  public set clientName(value: string) {
    this._clientName = value
  }
  
  public get idProduct(): number {
    return this._idProduct
  } 

  public get uniqueIdentifier(): string {
    return this._uniqueIdentifier
  }

  /**
   * @rule Para identificar a transação como unica é concatenado os seguintes campos
   * @field clientName - Nome do cliente
   * @field idProduct- Identificador do produto
   * @field idUser- Identificador do usuário
   * @field idOrder - Identificador do pedido
   * @field transactionDate - Data da transação no formato YYYY-MM-DD
   * @returns identificador unico da transção
   */
  public createUniqueIdentifier(): string {
    // Sanitiza clientName para evitar problemas com aspas simples
    const sanitizedClientName = this.clientName.replace(/'/g, `''`)
    this._uniqueIdentifier = `${sanitizedClientName}_${this.idProduct}_${this.idUser}_${this.idOrder}_${formatDateYYYYMMDD(this.transactionDate)}`
    return this._uniqueIdentifier
  }


  public get productValue(): number {
    return this._productValue
  }
  public set productValue(value: number) {
    this._productValue = value
  }

  public get createdAt(): Date {
    return this._createdAt
  } 

  public get transactionDate(): Date {
    return this._transactionDate
  } 
  public get updatedAt(): Date {
    return this._updatedAt
  }
  public set updatedAt(value: Date) {
    this._updatedAt = value
  }

  public get idUser(): number {
    return this._idUser
  } 

  public get id(): string {
    return this._id
  } 

  public get idOrder(): number {
    return this._idOrder
  } 

  

  toJson(): ProductTransactionDTO {
    return {
      clientName: this.clientName, 
      idProduct: this.idProduct, 
      productValue: this.productValue, 
      createdAt: this.createdAt, 
      transactionDate: this.transactionDate, 
      uniqueIdentifier: this.uniqueIdentifier,
      updatedAt: this.updatedAt, 
      idUser: this.idUser, 
      id: this.id, 
      idOrder: this.idOrder, 
    }
  }

}