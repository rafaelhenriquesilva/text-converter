
import { faker } from '@faker-js/faker' 

import { ProductTransactionEntity } from "../../../../entities/ProductTransactionEntity"

export const createProductTransactionMock = () => {
  return new ProductTransactionEntity({
    name: faker.string.sample({
      min: 5,
      max: 20
    }), 
    idProduct: '70', 
    productValue: 70.7, 
    createdAt: new Date(), 
    transactionDate: '2024-08-01', 
    updatedAt: new Date(), 
    idUser: '5', 
    id: faker.string.uuid(), 
    idOrder: '753', 
 
  }) 
}
