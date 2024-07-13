import { Request, Response } from "express";
import { ClienteRepository } from "../gateways/IClienteRepository";
import { ICadastroCliente } from "../interfaces/ICadastroCliente";
import { CreateClienteUseCase } from "../usecases/CreateClienteUseCase";
import { Db } from "mongodb";

export class ClienteController {
  private clienteRepository: ClienteRepository;
  private createClienteUseCase: CreateClienteUseCase;
  constructor(private db: Db) {
    this.clienteRepository = new ClienteRepository(this.db);
    this.createClienteUseCase = new CreateClienteUseCase(
      this.clienteRepository
    );
  }

  async createCliente(
    req: Request<any, any, ICadastroCliente>,
    res: Response
  ): Promise<Response> {
    const cliente = await this.createClienteUseCase.execute(req.body);

    if (!cliente) {
      return res.status(400).json({ message: "Cliente já cadastrado" });
    }

    return res.status(201).json(cliente);
  }
}
