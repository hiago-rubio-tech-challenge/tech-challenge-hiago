import { Express, Router } from "express";
import { Db } from "mongodb";
import { PedidoController } from "../../controllers/PedidoController";
import { validateCheckout } from "../schemas";

export const pedidoRouter = (app: Express, db: Db) => {
  const pedidoController = new PedidoController(db);
  const router = Router();

  app.get(
    "/checkout",
    validateCheckout,
    pedidoController.checkout.bind(pedidoController)
  );
  app.patch("/pedido", pedidoController.listPedidos.bind(pedidoController));

  app.use("/pedido", router);
};
