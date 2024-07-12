import { getDb } from "../../../../../shared/application/adapters/out/mongo-db";
import { COLLECTION_NAMES_ENUM } from "../../../../../shared/domain/collection-names";
import { ProductSchema } from "../../../../domain/model/product";
import { UpdateProductBody } from "../../in/schemas/admin.products.schemas";

export const updateProductMongo = async (product: UpdateProductBody) => {
  const db = getDb();
  const collection = db.collection<ProductSchema>(
    COLLECTION_NAMES_ENUM.products
  );

  const updatedProduct = {
    ...product,
    updatedAt: new Date(),
  };

  const result = await collection.findOneAndUpdate(
    { id: product.id },
    {
      $set: updatedProduct,
    },
    { returnDocument: "after" }
  );

  return result;
};
