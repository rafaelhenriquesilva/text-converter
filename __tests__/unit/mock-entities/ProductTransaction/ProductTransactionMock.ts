
import { faker } from '@faker-js/faker'
import { ProductTransactionEntity } from '../../../../src/domain/entities/ProductTransactionEntity'


export const createProductTransactionMock = () => {
  return new ProductTransactionEntity({
    clientName: faker.vehicle.vehicle(),
    idProduct: faker.number.int({
      min: 10,
      max: 999
    }),
    productValue: 70.7,
    transactionDate: new Date('2024-08-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
    idUser: faker.number.int({
      min: 10,
      max: 999
    }),
    id: faker.string.uuid(),
    idOrder: faker.number.int({
      min: 10,
      max: 999
    }),

  })
}
