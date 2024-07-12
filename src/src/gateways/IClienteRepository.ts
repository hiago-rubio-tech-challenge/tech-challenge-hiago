import { Cliente } from "../../entitites";
import { ICadastroCliente } from "../../interfaces/ICadastroCliente";

export interface IClienteRepository {
  consultaClienteCpfMongo(cpf: string): Promise<Cliente | null>;
  cadastroClienteMongo(cadastro: ICadastroCliente): Promise<Cliente | null>;
}
