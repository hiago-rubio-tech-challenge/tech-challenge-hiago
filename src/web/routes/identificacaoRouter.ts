import { Express, Router } from "express";
import { Db } from "mongodb";
import { ClienteController } from "../../controllers/ClienteController";
import { validateCadastro, validateIdentificacao } from "../schemas";

export const identificacaoRouter = (app: Express, db: Db) => {
  const clienteController = new ClienteController(db);
  const router = Router();
  router.post("/", validateCadastro, clienteController.createCliente);
  router.post(
    "/cadastro",
    validateIdentificacao,
    clienteController.identificacao
  );
  app.use("/identificacao", router);
};
