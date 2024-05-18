import { findPedidoMongo } from "../../application/adapters/out/pedido";
import { PedidosStatus } from "../model";

export const listPedidos = async (status?: PedidosStatus) => {
  const pedidos = await findPedidoMongo({ status });
  return pedidos;
};
