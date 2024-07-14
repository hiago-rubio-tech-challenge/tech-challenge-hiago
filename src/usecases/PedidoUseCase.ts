import { Pedido, PedidosStatus } from "../entitites";
import { IPedidoRepository } from "../gateways";
import { ICheckoutBody } from "../interfaces";

export interface IPedidoUseCase {
  checkout(body: ICheckoutBody): Promise<Pedido>;
  listPedidos(status: PedidosStatus): Promise<Pedido[] | null>;
}

export class PedidoUseCase implements IPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async checkout(body: ICheckoutBody): Promise<Pedido> {
    return this.pedidoRepository.checkout(body);
  }
  async listPedidos(status: PedidosStatus): Promise<Pedido[] | null> {
    return this.pedidoRepository.listPedidos({ status });
  }
}
