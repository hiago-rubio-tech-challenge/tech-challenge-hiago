import { randomUUID } from "crypto";
import { getDb } from "../../../../../shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../shared/domain/collection-names";
import {
  ProductSchema,
  CreateProductBody,
} from "../../../../domain/model/product";

export const createProductMongo = async (
  product: CreateProductBody
): Promise<ProductSchema> => {
  const db = getDb();
  const collection = db.collection<ProductSchema>(
    COLLECTION_NAMES_ENUM.clients
  );

  const result = await collection.insertOne({
    ...product,
    id: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const newProduct = await collection.findOne<ProductSchema>({
    _id: result.insertedId,
  });
  if (!newProduct) throw new Error("Inclusão de produto falhou!");
  return newProduct;
};
