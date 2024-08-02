
import { ProductTransactionDTO } from '../dto/ProductTransactionDTO'
export class ProductTransactionEntity 
{
        
  private readonly _name: string 
  private readonly _idProduct: string 
  private readonly _productValue: number 
  private readonly _createdAt: Date 
  private readonly _transactionDate: string 
  private readonly _updatedAt: Date 
  private readonly _idUser: string 
  private readonly _id: string 
  private readonly _idOrder: string 

  constructor(dto: ProductTransactionDTO) { 
    this._name = dto.name 
    this._idProduct = dto.idProduct 
    this._productValue = dto.productValue 
    this._createdAt = dto.createdAt 
    this._transactionDate = dto.transactionDate 
    this._updatedAt = dto.updatedAt 
    this._idUser = dto.idUser 
    this._id = dto.id 
    this._idOrder = dto.idOrder 
  }

  public get name(): string {
    return this._name
  } 

  public get idProduct(): string {
    return this._idProduct
  } 

  public get productValue(): number {
    return this._productValue
  } 

  public get createdAt(): Date {
    return this._createdAt
  } 

  public get transactionDate(): string {
    return this._transactionDate
  } 

  public get updatedAt(): Date {
    return this._updatedAt
  } 

  public get idUser(): string {
    return this._idUser
  } 

  public get id(): string {
    return this._id
  } 

  public get idOrder(): string {
    return this._idOrder
  } 
  toJson(): ProductTransactionDTO {
    return {
      name: this.name, 
      idProduct: this.idProduct, 
      productValue: this.productValue, 
      createdAt: this.createdAt, 
      transactionDate: this.transactionDate, 
      updatedAt: this.updatedAt, 
      idUser: this.idUser, 
      id: this.id, 
      idOrder: this.idOrder, 
    }
  }
}