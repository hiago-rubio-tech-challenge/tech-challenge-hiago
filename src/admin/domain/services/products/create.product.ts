import { createProductMongo } from "../../../application/adapters";
import { CreateProductBody, ProductSchema } from "../../model/product";

export const createProduct = async (
  product: CreateProductBody
): Promise<ProductSchema> => {
  return createProductMongo(product);
};
