import { ProductSchema } from "../../../admin/domain/model/product";
import { ClientSchema } from "../../../identificacao/domain";

export enum PedidosStatus {
  RECEBIDO = "RECEBIDO",
  EM_PREPARO = "EM_PREPARO",
  PRONTO = "PRONTO",
  FINALIZADO = "FINALIZADO",
  CANCELADO = "CANCELADO",
}

export interface Pedidos {
  _id?: string;
  id: string;
  client: Pick<ClientSchema, "id" & "name">;
  totalValue: number;
  totalItens: number;
  status: PedidosStatus;
  products: Pick<ProductSchema, "id" & "name" & "category" & "price">[];
  createdAt: Date;
  updatedAt: Date;
}
