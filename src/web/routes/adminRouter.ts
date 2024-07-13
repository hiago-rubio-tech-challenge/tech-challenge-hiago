import { Express, Router } from "express";
import { Db } from "mongodb";
import { AdminController } from "../../controllers/AdminController";

export const adminRouter = (app: Express, db: Db) => {
  const adminController = new AdminController(db);
  const router = Router();
  app.get("/admin/products/:category", adminController.getProdutosByCategory); // TODO - Incluir validacao de rotas e controller
  app.patch("/admin/products", adminController.updateProduto); // TODO - Incluir validacao de rotas e controller
  app.delete("/admin/products", adminController.deleteProduto); // TODO - Incluir validacao de rotas e controller
  app.post("/admin/products", adminController.createProduto); // TODO - Incluir validacao de rotas e controller
  app.use("/admin", router);
};
