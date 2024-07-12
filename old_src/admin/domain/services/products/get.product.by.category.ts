import { findProductMongo } from "../../../application/adapters";

export const getProductByCategory = async (category: string) =>
  findProductMongo({ category });
