import { getDb } from "../../../../DONE_shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../DONE_shared/domain/collection-names";

export const consultaClienteCpfMongo = async (cpf: string) => {
  const db = getDb();
  const collection = db.collection(COLLECTION_NAMES_ENUM.clients);

  const cliente = await collection.findOne({ cpf });
  return cliente;
};
