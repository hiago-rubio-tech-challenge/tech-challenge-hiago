import { Express, Router } from "express";
import { Db } from "mongodb";
import { AdminController } from "../../controllers/AdminController";
import {
  validateCreateProduto,
  validateDeleteProduto,
  validateUpdateProduto,
} from "../schemas";

export const adminRouter = (app: Express, db: Db) => {
  const adminController = new AdminController(db);
  const router = Router();
  app.get("/products/:category", adminController.getProdutosByCategory);
  app.patch("/products", validateUpdateProduto, adminController.updateProduto); // TODO - Incluir validacao de rotas e controller
  app.delete("/products", validateDeleteProduto, adminController.deleteProduto); // TODO - Incluir validacao de rotas e controller
  app.post("/products", validateCreateProduto, adminController.createProduto); // TODO - Incluir validacao de rotas e controller
  app.use("/admin", router);
};
