import { Filter } from "mongodb";
import { getDb } from "../../../../../shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../shared/domain/collection-names";
import { ProductSchema } from "../../../../domain/model/product";

export const findProductMongo = async (
  filter: Filter<ProductSchema>
): Promise<ProductSchema[]> => {
  const db = getDb();
  const collection = db.collection<ProductSchema>(
    COLLECTION_NAMES_ENUM.products
  );

  const newProduct = await collection.find({ ...filter, deleted: false });

  if (!newProduct) throw new Error("Inclusão de produto falhou!");
  return newProduct.toArray();
};
