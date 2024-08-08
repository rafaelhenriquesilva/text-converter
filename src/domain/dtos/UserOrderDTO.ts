export interface OrderProductDTO {
    product_id: number;
    value: string;
}

export interface OrderDTO {
    order_id: number;
    total: string;
    date: string;
    products: OrderProductDTO[];
}

export interface UserOrderDTO {
    user_id: number;
    name: string;
    orders: OrderDTO[];
}