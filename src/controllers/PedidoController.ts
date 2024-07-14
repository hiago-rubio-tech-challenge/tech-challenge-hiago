import { Db } from "mongodb";
import { Express, Request, Response } from "express";
import { PedidosStatus } from "../entitites/PedidoStatus";
import { ICheckoutBody } from "../interfaces";
import { PedidoRepository } from "../gateways";
import { PedidoUseCase } from "../usecases/PedidoUseCase";

export class PedidoController {
  private pedidoRepository: PedidoRepository;
  private pedidoUseCase: PedidoUseCase;

  constructor(private db: Db) {
    this.pedidoRepository = new PedidoRepository(this.db);
    this.pedidoUseCase = new PedidoUseCase(this.pedidoRepository);
  }

  public checkout = async (req: Request, res: Response) => {
    try {
      const checkoutBody: ICheckoutBody = req.body;
      const pedido = await this.pedidoUseCase.checkout(checkoutBody);
      res.status(201).send(pedido);
    } catch (error) {
      res.status(500).send({ error });
    }
  };

  public listPedidos = async (req: Request, res: Response) => {
    try {
      const pedidoStatus = req.headers["pedido_status"];
      const pedidos = await this.pedidoUseCase.listPedidos(
        pedidoStatus as PedidosStatus
      );
      res.status(200).send(pedidos);
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}
