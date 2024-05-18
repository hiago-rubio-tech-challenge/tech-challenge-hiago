import { CheckoutBody } from "../../application/adapters";
import { createPedidoMongo } from "../../application/adapters/out/pedido";

export const checkout = async (body: CheckoutBody) => {
  const pedido = createPedidoMongo(body);

  return pedido;
};
