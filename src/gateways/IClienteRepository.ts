import { Cliente } from "../entitites";
import { ICadastroCliente } from "../interfaces/ICadastroCliente";
import { MongoClientWrapper } from "../db/MongoCliente";
import { COLLECTION_NAMES_ENUM } from "../enums";
import { Db } from "mongodb";

export interface IClienteRepository {
  consultaClienteCpfMongo(cpf: string): Promise<Cliente | null>;
  cadastroClienteMongo(cadastro: ICadastroCliente): Promise<Cliente | null>;
}

export class ClienteRepository implements IClienteRepository {
  constructor(private db: Db) {}

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
