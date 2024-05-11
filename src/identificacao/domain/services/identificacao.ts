import { Request, Response } from "express";
import { consultaClienteCpfMongo } from "../../application/adapters/out/consulta.cliente.cpf.mongo";

export async function identificacao(cpf: string) {
  const cliente = await consultaClienteCpfMongo(cpf);
  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  } else {
    return cliente;
  }
}
