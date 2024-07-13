import { Express, Router } from "express";
import { Db } from "mongodb";
import { ClienteController } from "../../controllers/ClienteController";

export const identificacaoRouter = (app: Express, db: Db) => {
  const clienteController = new ClienteController(db);
  const router = Router();
  router.post("/identificacao", clienteController.createCliente); //todo adicionar validacao da rota
  app.use("/identificacao", router);
};
