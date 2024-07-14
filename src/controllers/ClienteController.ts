import { Request, Response } from "express";
import { Db } from "mongodb";
import { ClienteRepository } from "../gateways/ClienteRepository";
import { IdentificacaoUseCase } from "../usecases/IdentificacaoUseCase";
import { ICreateCliente } from "../interfaces";

export class ClienteController {
  private clienteRepository: ClienteRepository;
  private IdentificacaoUseCase: IdentificacaoUseCase;
  constructor(private db: Db) {
    this.clienteRepository = new ClienteRepository(this.db);
    this.IdentificacaoUseCase = new IdentificacaoUseCase(
      this.clienteRepository
    );
  }

  async createCliente(
    req: Request<any, any, ICreateCliente>,
    res: Response
  ): Promise<Response> {
    const cliente = await this.IdentificacaoUseCase.createCliente(req.body);

    if (!cliente) {
      return res.status(400).json({ message: "Cliente já cadastrado" });
    }

    return res.status(201).json(cliente);
  }

  async identificacao(req: Request, res: Response): Promise<Response> {
    const cliente = await this.IdentificacaoUseCase.identificacao(req.body.cpf);

    if (!cliente) {
      return res.status(400).json({ message: "Cliente não encontrado" });
    }

    return res.status(200).json(cliente);
  }
}
