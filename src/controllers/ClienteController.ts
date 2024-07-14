import { Request, Response } from "express";
import { Db } from "mongodb";
import { ClienteRepository } from "../gateways/ClienteRepository";
import { ICreateCliente } from "../interfaces";
import { IdentificacaoUseCase } from "../usecases/IdentificacaoUseCase";

export class ClienteController {
  private identificacaoUseCase: IdentificacaoUseCase;
  constructor(db: Db) {
    this.identificacaoUseCase = new IdentificacaoUseCase(
      new ClienteRepository(db)
    );
  }

  async createCliente(
    req: Request<any, any, ICreateCliente>,
    res: Response
  ): Promise<Response> {
    try {
      const cliente = await this.identificacaoUseCase.createCliente(req.body);

      if (!cliente) {
        return res.status(400).json({ message: "Cliente já cadastrado" });
      }

      return res.status(201).json(cliente);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async identificacao(req: Request, res: Response): Promise<Response> {
    try {
      const cliente = await this.identificacaoUseCase.identificacao(
        req.body.cpf
      );

      if (!cliente) {
        return res.status(400).json({ message: "Cliente não encontrado" });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
