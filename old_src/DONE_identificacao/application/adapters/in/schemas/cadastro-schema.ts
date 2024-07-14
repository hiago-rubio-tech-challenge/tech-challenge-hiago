import { NextFunction, Request, Response } from "express";
import Joi, { func } from "joi";
import { cpfValidation } from "../../../../../DONE_shared/application/adapters/schemas/cpf.validation";

export const CadastroSChema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().custom(cpfValidation).required(),
});

export function validateCadastro(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const { error } = CadastroSChema.validate(body);
  if (error) {
    res
      .status(400)
      .send("Não foi possível realizar cadastro. Error: Dados inválidos.");
  } else {
    next();
  }
}
