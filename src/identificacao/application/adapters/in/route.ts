import { Express } from "express";
import { CadastroBody, cadastro, identificacao } from "../../../domain";
import { validateCadastro } from "./schemas/cadastro-schema";
import { validateIdentificacao } from "./schemas/identificacao-schema";

export function routes(app: Express): void {
  app.post("/cadastro", validateCadastro, async (req, res) => {
    try {
      const body = req.body;
      const cadastroPayload: CadastroBody = {
        nome: body.nome,
        email: body.email,
        cpf: body.cpf,
      };
      await cadastro(cadastroPayload);
      res.send("Cadastro realizado com sucesso.");
    } catch (error) {
      res.status(500).send(`Não foi possível realizar cadastro. ${error}`);
    }
  });

  app.post("/identificacao", validateIdentificacao, async (req, res) => {
    try {
      const cpf = req.body.cpf;
      const cliente = await identificacao(cpf);
      res.status(200).send(cliente);
    } catch (error) {
      res.status(500).send(`Não foi encontrar o cliente. ${error}`);
    }
  });
}
