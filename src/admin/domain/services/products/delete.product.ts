import { softDeleteProductMongo } from "../../../application/adapters";

export const deleteProduct = async (id: string) => softDeleteProductMongo(id);
