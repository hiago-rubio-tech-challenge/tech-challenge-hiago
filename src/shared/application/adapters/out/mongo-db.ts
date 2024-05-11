import { MongoClient, Db } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "techChallenge";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectMongo() {
  if (!client || !db) {
    client = new MongoClient(url);

    try {
      await client.connect();
      console.log("Conectado com sucesso ao servidor MongoDB");

      db = client.db(dbName);
    } catch (error) {
      console.error("Erro ao conectar ao servidor MongoDB:", error);
      throw error;
    }
  }

  if (!client || !db) {
    throw new Error("Conexão com o MongoDB não estabelecida.");
  }
  return { client, db };
}

export function getDb(): Db {
  if (!db) {
    throw new Error("Conexão com o MongoDB não estabelecida.");
  }
  return db;
}

export async function closeMongo(client: MongoClient) {
  try {
    await client.close();
    console.log("Conexão com MongoDB fechada com sucesso");
  } catch (error) {
    console.error("Erro ao fechar conexão com MongoDB:", error);
    throw error;
  }
}
