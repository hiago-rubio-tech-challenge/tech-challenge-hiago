import Joi from "joi";
import { ProductCategories } from "../../../../../DONE_shared/domain/enums";
import { NextFunction, Request, Response } from "express";

export interface CreateProductBody {
  name: string;
  category: string;
  price: number;
}

const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid(...Object.values(ProductCategories))
    .required(),
  price: Joi.number().required(),
});

export function validateCreateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const { error } = productSchema.validate(body);
  if (error) {
    res
      .status(400)
      .send("Não foi possível cadastrar o produto. Error: Dados inválidos.");
  } else {
    next();
  }
}

export interface UpdateProductBody {
  id: string;
  name: string;
  category: string;
  price: number;
}

const updateProductSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  category: Joi.string().valid(...Object.values(ProductCategories)),
  price: Joi.number(),
});

export function validateUpdateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const { error } = updateProductSchema.validate(body);
  if (error) {
    res
      .status(400)
      .send(
        "Não foi possível atualizar cadastrar o produto. Error: Dados inválidos."
      );
  } else {
    next();
  }
}

export interface DeleteProductBody {
  id: string;
}

const deleteProductSchema = Joi.object({
  id: Joi.string().required(),
});

export function validateDeleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const { error } = deleteProductSchema.validate(body);
  if (error) {
    res
      .status(400)
      .send(
        "Não foi possível atualizar cadastrar o produto. Error: Dados inválidos."
      );
  } else {
    next();
  }
}
