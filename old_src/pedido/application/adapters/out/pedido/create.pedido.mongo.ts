import { randomUUID } from "crypto";
import { getDb } from "../../../../../shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../shared/domain/collection-names";
import { CheckoutBody } from "../../in";
import { Pedidos, PedidosStatus } from "../../../../domain";

export const createPedidoMongo = async (
  pedido: CheckoutBody
): Promise<Pedidos> => {
  const db = getDb();
  const collection = db.collection<Pedidos>(COLLECTION_NAMES_ENUM.pedidos);

  const result = await collection.insertOne({
    ...pedido,
    id: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    status: PedidosStatus.RECEBIDO,
  });

  const newPedido = await collection.findOne<Pedidos>({
    _id: result.insertedId,
  });
  if (!newPedido) throw new Error("Inclusão de pedido falhou!");
  return newPedido;
};
