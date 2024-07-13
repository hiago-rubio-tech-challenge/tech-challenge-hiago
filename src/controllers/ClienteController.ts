import { Request, Response } from "express";
import { Db } from "mongodb";
import { ClienteRepository } from "../gateways/ClienteRepository";
import { ClienteUseCase } from "../usecases/ClienteUseCase";
import { ICreateCliente } from "../interfaces";

export class ClienteController {
  private clienteRepository: ClienteRepository;
  private ClienteUseCase: ClienteUseCase;
  constructor(private db: Db) {
    this.clienteRepository = new ClienteRepository(this.db);
    this.ClienteUseCase = new ClienteUseCase(this.clienteRepository);
  }

  async createCliente(
    req: Request<any, any, ICreateCliente>,
    res: Response
  ): Promise<Response> {
    const cliente = await this.ClienteUseCase.execute(req.body);

    if (!cliente) {
      return res.status(400).json({ message: "Cliente já cadastrado" });
    }

    return res.status(201).json(cliente);
  }
}
