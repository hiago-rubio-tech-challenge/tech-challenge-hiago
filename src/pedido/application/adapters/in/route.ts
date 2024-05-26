import { Express, Request, Response } from "express";
import { CheckoutBody, validateCheckout } from "./schemas/checkout.schema";
import { PedidosStatus, checkout, listPedidos } from "../../../domain";

export function routes(app: Express): void {
  app.post(
    "/pedido/checkout",
    validateCheckout,
    async (req: Request, res: Response) => {
      try {
        const checkoutBody: CheckoutBody = req.body;
        const pedido = await checkout(checkoutBody);
        res.status(201).send(pedido);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  );

  app.get("/pedido", async (req: Request, res: Response) => {
    try {
      const pedidoStatus = req.headers["pedido_status"];
      const pedidos = await listPedidos(pedidoStatus as PedidosStatus);
      res.status(200).send(pedidos);
    } catch (error) {
      res.status(500).send({ error });
    }
  });
}
