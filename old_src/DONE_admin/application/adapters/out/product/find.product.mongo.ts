import { Filter } from "mongodb";
import { getDb } from "../../../../../DONE_shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../DONE_shared/domain/collection-names";
import { ProductSchema } from "../../../../domain/model/product";

export const findProductMongo = async (
  filter: Filter<ProductSchema>
): Promise<ProductSchema[]> => {
  const db = getDb();
  const collection = db.collection<ProductSchema>(
    COLLECTION_NAMES_ENUM.products
  );

  const product = await collection
    .find({ ...filter, deleted: { $ne: false } })
    .toArray();

  if (!product) throw new Error("Busca de produto falhou!");
  return product;
};
