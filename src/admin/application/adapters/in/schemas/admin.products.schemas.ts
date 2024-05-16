import Joi from "joi";
import { ProductCategories } from "../../../../../shared/domain/enums";

export interface CreateProductBody {
  name: string;
  category: string;
  price: number;
}

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
});

export function validateCreateProduct(body: CreateProductBody) {
  return productSchema.validate(body);
}

export interface UpdateProductBody {
  id: string;
  name: string;
  category: string;
  price: number;
}

const updateProductSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  category: Joi.string().required().valid(Object.values(ProductCategories)),
  price: Joi.number().required(),
});

export function validateUpdateProduct(body: UpdateProductBody) {
  return updateProductSchema.validate(body);
}

export interface DeleteProductBody {
  id: string;
}

const deleteProductSchema = Joi.object({
  id: Joi.string().required(),
});

export function validateDeleteProduct(body: DeleteProductBody) {
  return deleteProductSchema.validate(body);
}
