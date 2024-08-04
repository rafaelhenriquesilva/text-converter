
import { faker } from '@faker-js/faker'

import { ProductTransactionEntity } from "../../../../entities/ProductTransactionEntity"

export const createProductTransactionMock = () => {
  return new ProductTransactionEntity({
    name: faker.vehicle.vehicle(),
    idProduct: faker.number.int({
      min: 10,
      max: 999
    }).toString(),
    productValue: 70.7,
    transactionDate: new Date('2024-08-01'),
    idUser: faker.number.int({
      min: 10,
      max: 999
    }).toString(),
    id: faker.string.uuid(),
    idOrder: faker.number.int({
      min: 10,
      max: 999
    }).toString(),

  })
}
