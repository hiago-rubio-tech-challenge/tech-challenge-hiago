import { Request, Response } from "express";
import { CadastroBody } from "../model";
import { cadastroClienteMongo } from "../../application/adapters/out/cadastro.cliente.mongo";
import { consultaClienteCpfMongo } from "../../application/adapters/out/consulta.cliente.cpf.mongo";

export async function cadastro(cadastro: CadastroBody) {
  const cliente = await consultaClienteCpfMongo(cadastro.cpf);
  if (cliente) {
    throw new Error("Cliente já cadastrado.");
  }
  await cadastroClienteMongo(cadastro);
}
