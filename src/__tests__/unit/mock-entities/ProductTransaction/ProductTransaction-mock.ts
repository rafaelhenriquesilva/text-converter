
import { faker } from '@faker-js/faker' 

import { ProductTransactionEntity } from "../../../../entities/ProductTransactionEntity"

export const createProductTransactionMock = () => {
  return new ProductTransactionEntity({
    name: faker.string.sample({
      min: 5,
      max: 20
    }), 
    idProduct: faker.number.int({
      min: 10,
      max:50
    }).toString(), 
    productValue: 70.7, 
    createdAt: new Date(), 
    transactionDate: '2024-08-01', 
    updatedAt: new Date(), 
    idUser: faker.number.int({
      min: 10,
      max:50
    }).toString(), 
    id: faker.string.uuid(), 
    idOrder: faker.number.int({
      min: 10,
      max:50
    }).toString(), 
 
  }) 
}
