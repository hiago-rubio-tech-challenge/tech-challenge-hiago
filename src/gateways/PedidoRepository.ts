import { Collection, Db, Filter } from "mongodb";
import { Pedido, PedidosStatus } from "../entitites";
import { ICheckoutBody } from "../interfaces";
import { COLLECTION_NAMES_ENUM } from "../enums";
import { randomUUID } from "crypto";

export interface IPedidoRepository {
  checkout(body: ICheckoutBody): Promise<Pedido>;
  listPedidos(filter: Filter<Pedido>): Promise<Pedido[] | null>;
}

export class PedidoRepository implements IPedidoRepository {
  private collection: Collection<Pedido>;

  constructor(private db: Db) {
    this.collection = this.db.collection<Pedido>(COLLECTION_NAMES_ENUM.pedidos);
  }

  async checkout(pedido: ICheckoutBody): Promise<Pedido> {
    const result = await this.collection.insertOne({
      ...pedido,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: PedidosStatus.RECEBIDO,
    });

    const newPedido = await this.collection.findOne<Pedido>({
      _id: result.insertedId,
    });
    if (!newPedido) throw new Error("Inclusão de pedido falhou!");
    return newPedido;
  }
  async listPedidos(filter: Filter<Pedido>): Promise<Pedido[] | null> {
    const newPedido = await this.collection.find({ ...filter });

    if (!newPedido) throw new Error("Não foi possivel encontrar o pedido");
    return newPedido.toArray();
  }
}
