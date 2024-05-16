import { Express, Request, Response } from "express";
import {
  validateCreateProduct,
  validateDeleteProduct,
  validateUpdateProduct,
} from "./schemas/admin.products.schemas";
import {
  getProductByCategory,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../../../domain/services";
import { ProductCategories } from "../../../../shared/domain/enums";

export function routes(app: Express): void {
  app.get("/admin/products/:category", async (req: Request, res: Response) => {
    const { category } = req.params;
    if (!(category in ProductCategories)) {
      res.status(400).send({ error: "Categoria inválida" });
      return;
    }
    try {
      const products = await getProductByCategory(category);
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ error });
    }
  });

  app.patch(
    "/admin/products",
    validateUpdateProduct,
    async (req: Request, res: Response) => {
      const { id, name, category, price } = req.body;
      try {
        const product = await updateProduct({ id, name, category, price });
        res.status(200).send(product);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  );

  app.delete(
    "/admin/products",
    validateDeleteProduct,
    async (req: Request, res: Response) => {
      const { id } = req.body;
      try {
        const product = await deleteProduct(id);
        res.status(200).send(product);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  );

  app.post(
    "/admin/products",
    validateCreateProduct,
    async (req: Request, res: Response) => {
      const { name, category, price } = req.body;
      try {
        const product = await createProduct({ name, category, price });
        res.status(200).send(product);
      } catch (error) {
        res.status(500).send({ error });
      }
    }
  );
}
