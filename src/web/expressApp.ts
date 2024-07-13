import express from "express";
import { Server } from "http";
import identificacaoRouter from "./routes/identificacao/identificacaoRouter";
import { Db } from "mongodb";

export const expressStart = async (port: number, db: Db) => {
  const app = express();
  app.use(express.json());
  identificacaoRouter(app, db);

  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

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
