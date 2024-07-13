import { CadastroBody } from "../../../domain";
import { COLLECTION_NAMES_ENUM } from "../../../../shared/domain/collection-names";
import { getDb } from "../../../../shared/application/adapters/out/mongo-db";

export async function cadastroClienteMongo(cadastro: CadastroBody) {
  const db = getDb();
  const collection = db.collection(COLLECTION_NAMES_ENUM.clients);
  await collection.insertOne(cadastro);
}
