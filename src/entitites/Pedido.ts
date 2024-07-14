import { Cliente } from "./Cliente";
import { PedidosStatus } from "./PedidoStatus";
import { Produto } from "./Produto";

export class Pedido {
  constructor(
    public id: string,
    public client: Pick<Cliente, "id" & "name">,
    public totalValue: number,
    public totalItens: number,
    public status: PedidosStatus,
    public products: Pick<Produto, "id" & "name" & "category" & "price">[],
    public createdAt: Date,
    public updatedAt: Date,
    public _id?: string
  ) {}
}
