import {
  ProductSchema,
  UpdateProductBody,
} from "../../../../../DONE_admin/domain/model/product";
import { getDb } from "../../../../../DONE_shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../DONE_shared/domain/collection-names";

export const updateProductMongo = async (product: UpdateProductBody) => {
  const db = getDb();
  const collection = db.collection<ProductSchema>(
    COLLECTION_NAMES_ENUM.products
  );

  const updatedProduct = {
    $set: {
      ...product,
      updatedAt: new Date(),
    },
    id: product.id,
  };

  const result = await collection.updateOne(
    { _id: product.id },
    {
      updatedProduct,
    }
  );

  return result;
};
