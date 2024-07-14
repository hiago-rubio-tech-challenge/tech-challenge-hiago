import { Cliente } from "../entitites";
import { IClienteRepository } from "../gateways/ClienteRepository";
import { ICreateCliente } from "../interfaces";

export interface IIdentificacaoUseCase {
  createCliente(cadastro: ICreateCliente): Promise<Cliente | null>;
  identificacao(cpf: string): Promise<Cliente | null>;
}

export class IdentificacaoUseCase implements IIdentificacaoUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async createCliente(cadastro: ICreateCliente): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.consultaClienteCpfMongo(
      cadastro.cpf
    );

    if (cliente) {
      throw new Error("Cliente já cadastrado.");
    }

    return this.clienteRepository.cadastroClienteMongo(cadastro);
  }

  async identificacao(cpf: string): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.consultaClienteCpfMongo(cpf);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    return cliente;
  }
}
