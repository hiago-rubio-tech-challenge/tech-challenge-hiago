import { Cliente } from "../entitites";
import { IClienteRepository } from "../gateways/ClienteRepository";
import { ICreateCliente } from "../interfaces";

export class ClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(cadastro: ICreateCliente): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.consultaClienteCpfMongo(
      cadastro.cpf
    );

    if (cliente) {
      return null;
    }

    return this.clienteRepository.cadastroClienteMongo(cadastro);
  }
}
