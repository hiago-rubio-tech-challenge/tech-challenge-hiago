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
  app.patch(
    "/products",
    validateUpdateProduto,
    adminController.updateProduto.bind(adminController)
  );
  app.delete(
    "/products",
    validateDeleteProduto,
    adminController.deleteProduto.bind(adminController)
  );
  app.post(
    "/products",
    validateCreateProduto,
    adminController.createProduto.bind(adminController)
  );
  app.use("/admin", router);
};
