import { Filter } from "mongodb";
import { getDb } from "../../../../../shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../shared/domain/collection-names";
import { Pedidos } from "../../../../domain";

export const findPedidoMongo = async (
  filter: Filter<Pedidos>
): Promise<Pedidos[]> => {
  const db = getDb();
  const collection = db.collection<Pedidos>(COLLECTION_NAMES_ENUM.pedidos);

  const newPedido = await collection.find({ ...filter });

  if (!newPedido) throw new Error("Não foi possivel encontrar o pedido");
  return newPedido.toArray();
};
