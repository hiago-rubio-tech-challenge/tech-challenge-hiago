import express from "express";

import { Server } from "http";
import { routes as identificacaoRoutes } from "../../../../../DONE_identificacao/application/adapters/in/route";
import { routes as adminRoutes } from "../../../../../DONE_admin/application/adapters/in/route";
import { routes as pedidoRoutes } from "../../../../../DONE_pedido/application/adapters/in/route";
import { swaggerSetup } from "./docs/swagger.setup";

export async function expressStart() {
  const app = express();
  const port = 3000;

  app.use(express.json());

  adminRoutes(app);
  identificacaoRoutes(app);
  pedidoRoutes(app);
  swaggerSetup(app);

  return app.listen(port, () => {
    console.log(`Tech Challeng está ativo na porta:  ${port}`);
  });
}

export function gracefulShutdown(server: Server): void {
  if (server) {
    console.log("Encerrando o servidor Express de forma graciosa...");

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
