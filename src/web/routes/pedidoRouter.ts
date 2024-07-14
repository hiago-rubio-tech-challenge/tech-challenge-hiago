import { Express, Router } from "express";
import { Db } from "mongodb";
import { PedidoController } from "../../controllers/PedidoController";
import { validateCheckout } from "../schemas";

export const pedidoRouter = (app: Express, db: Db) => {
  const pedidoController = new PedidoController(db);
  const router = Router();

  app.get("/checkout", validateCheckout, pedidoController.checkout);
  app.patch("/pedido", pedidoController.listPedidos);

  app.use("/pedido", router);
};
