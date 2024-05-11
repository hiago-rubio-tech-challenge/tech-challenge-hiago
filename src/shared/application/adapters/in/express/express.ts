import express from "express";

import { Server } from "http";
import { routes as identificacaoRoutes } from "../../../../../identificacao/application/adapters/in/route";

export async function expressStart() {
  const app = express();
  const port = 3000;

  app.use(express.json());

  identificacaoRoutes(app);

  return app.listen(port, () => {
    console.log(`Tech Challeng está ativo na porta:  ${port}`);
  });
}

export function gracefulShutdown(server: Server): void {
  if (server) {
    console.log("Encerrando o servidor Express de forma graciosa...");

    // Fecha o servidor Express
    server.close((err?: Error) => {
      if (err) {
        console.error("Erro ao encerrar o servidor:", err);
        process.exit(1);
      } else {
        console.log("Servidor encerrado com sucesso.");
        process.exit(0);
      }
    });
  } else {
    console.error("O servidor Express não está inicializado.");
    process.exit(1);
  }
}
