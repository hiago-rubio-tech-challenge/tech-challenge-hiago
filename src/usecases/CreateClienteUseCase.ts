import { Cliente } from "../entitites";
import { IClienteRepository } from "../gateways/IClienteRepository";
import { ICadastroCliente } from "../interfaces/ICadastroCliente";

export class CreateClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(cadastro: ICadastroCliente): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.consultaClienteCpfMongo(
      cadastro.cpf
    );

    if (cliente) {
      return null;
    }

    return this.clienteRepository.cadastroClienteMongo(cadastro);
  }
}
