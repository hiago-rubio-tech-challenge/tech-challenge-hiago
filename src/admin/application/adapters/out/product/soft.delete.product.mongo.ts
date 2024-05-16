import { getDb } from "../../../../../shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../shared/domain/collection-names";
import { ProductSchema } from "../../../../domain/model/product";

export async function softDeleteProductMongo(id: string) {
  const db = getDb();
  const collection = db.collection<ProductSchema>(
    COLLECTION_NAMES_ENUM.clients
  );

  const result = await collection.updateOne(
    { _id: id },
    {
      $set: {
        deleted: true,
        deletedAt: new Date(),
      },
    }
  );

  return result;
}
