import { findProductMongo } from "../../../application/adapters";

export const getProductByCategory = async (category: string) => {
  return findProductMongo({ category });
};
