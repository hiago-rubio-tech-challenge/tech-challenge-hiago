import { Pedido, Produto } from "../../entitites";
import {
  MercadoPagoOrder,
  MercadoPagoOrderItens,
} from "../interfaces/mercadoPagoOrder";

const wireProducts = (
  products: { id: string; name: string; category: string; price: number }[]
): MercadoPagoOrderItens[] => {
  return products.map((product) => ({
    sku_number: product.id,
    category: product.category,
    title: product.name,
    unit_price: product.price,
    quantity: 1,
    total_amount: product.price,
  }));
};

export const mercadoPagoOrderWireOut = (pedido: Pedido): MercadoPagoOrder => {
  return {
    cash_out: {
      amount: 0,
    },
    description: `Pedido id: ${pedido.id} do cliente ${pedido.client.name}`,
    external_reference: String(pedido._id),
    items: wireProducts(pedido.products),
    notification_url: "http://www.yourserver.com/notification",
    title: `Pedido id: ${pedido.id}`,
    total_amount: pedido.totalValue,
  };
};
