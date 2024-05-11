import { NextFunction, Request, Response } from "express";
import Joi, { func } from "joi";
import { cpfValidation } from "../../../../../shared/application/adapters/schemas/cpf-validation";

export const cadastroSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().custom(cpfValidation).required(),
});

export function validateCadastro(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const { error } = cadastroSchema.validate(body);
  if (error) {
    res
      .status(400)
      .send("Não foi possível realizar cadastro. Error: Dados inválidos.");
  } else {
    next();
  }
}
