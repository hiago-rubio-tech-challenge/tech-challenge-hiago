import "dotenv/config";
import {
  expressStart,
  gracefulShutdown,
} from "./DONE_shared/application/adapters/in/express/express";
import {
  closeMongo,
  connectMongo,
} from "./DONE_shared/application/adapters/out/mongo-db";

async function main() {
  try {
    console.log("client");
    const { client } = await connectMongo();
    const app = await expressStart();

    process.on("SIGINT", () => {
      gracefulShutdown(app);
      closeMongo(client);
    });

    process.on("SIGTERM", () => {
      gracefulShutdown(app);
      closeMongo(client);
    });

    console.log("Aplicação iniciada com sucesso.");
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1);
  }
}

main();
