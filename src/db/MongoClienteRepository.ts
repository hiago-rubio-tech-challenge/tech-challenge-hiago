import { Db } from "mongodb";
import { Cliente } from "../entitites";
import { COLLECTION_NAMES_ENUM } from "../enums";
import { ICadastroCliente } from "../interfaces/ICadastroCliente";
import { IClienteRepository } from "../src/gateways/IClienteRepository";

export class InMemoryCustomerRepository implements IClienteRepository {
  db: Db;
  constructor(db: Db) {
    this.db = db;
  }

  async consultaClienteCpfMongo(cpf: string): Promise<Cliente | null> {
    const collection = this.db.collection(COLLECTION_NAMES_ENUM.clients);

    return collection.findOne<Cliente>({ cpf });
  }

  async cadastroClienteMongo(
    cadastro: ICadastroCliente
  ): Promise<Cliente | null> {
    const collection = this.db.collection(COLLECTION_NAMES_ENUM.clients);
    const result = await collection.insertOne(cadastro);
    return collection.findOne<Cliente>({ _id: result.insertedId });
  }
}
