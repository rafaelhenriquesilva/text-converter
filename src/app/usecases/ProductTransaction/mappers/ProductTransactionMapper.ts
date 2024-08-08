import { ProductTransactionEntity } from '../../../../domain/entities/ProductTransactionEntity'
import { UserOrderDTO } from '../../../../domain/dtos/UserOrderDTO'
import { formatDateYYYYMMDD } from '../../../../infra/util/DateUtil'

export class ProductTransactionMapper {
  static toBusinessResponse(entities: ProductTransactionEntity[]): UserOrderDTO[] {
    const userMap = new Map<number, UserOrderDTO>()
    if (entities && entities.length > 0) {

      for (const entity of entities) {
        const userId = entity.idUser
        const orderId = entity.idOrder

        if (!userMap.has(userId)) {
          userMap.set(userId, {
            user_id: userId,
            name: entity.clientName,
            orders: []
          })
        }

        const userOrder = userMap.get(userId)

        let order = userOrder?.orders.find(data => data.order_id === orderId)
        if (!order) {
          order = {
            order_id: orderId,
            total: '0',
            date: formatDateYYYYMMDD(entity.transactionDate),
            products: []
          }
          userOrder?.orders.push(order)
        }

        const product = order.products.find(data => data.product_id === entity.idProduct)
        if (product) {
          product.value = (parseFloat(product.value) + entity.productValue).toFixed(2)
        } else {
          order.products.push({
            product_id: entity.idProduct,
            value: entity.productValue.toFixed(2)
          })
        }

        // Atualizar o total do pedido
        order.total = (parseFloat(order.total) + entity.productValue).toFixed(2)
      }
    }

    return Array.from(userMap.values())
  }
}
