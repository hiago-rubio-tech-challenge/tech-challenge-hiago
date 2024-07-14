import { Request, Response } from "express";
import { Db } from "mongodb";
import { AdminRepository } from "../gateways";
import { AdminUseCase } from "../usecases";
import { ProdutoCategories } from "../entitites/ProdutoCategories";
import { ICreateProduto, IUpdateProduto } from "../interfaces";

export class AdminController {
  private adminRepository: AdminRepository;
  private adminUseCase: AdminUseCase;

  constructor(private db: Db) {
    this.adminRepository = new AdminRepository(this.db);
    this.adminUseCase = new AdminUseCase(this.adminRepository);
  }

  async getProdutosByCategory(req: Request, res: Response) {
    const { category } = req.params;
    if (!Object.values(ProdutoCategories).find((cat) => cat === category)) {
      res.status(400).send({ error: "Categoria inválida" });
      return;
    }
    try {
      const produtos = await this.adminUseCase.findProdutoByCategory(
        category as ProdutoCategories
      );
      if (produtos && produtos.length) {
        res.status(200).send(produtos);
      } else {
        res.status(404).send({ error: "Nenhum produto encontrado." });
      }
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async createProduto(req: Request, res: Response) {
    const produto: ICreateProduto = req.body;
    await this.adminUseCase.createProduto(produto);
  }

  async updateProduto(req: Request, res: Response) {
    const produto: IUpdateProduto = req.body;
    await this.adminUseCase.updateProduto(produto);
  }

  async deleteProduto(req: Request, res: Response) {
    const { id } = req.body;
    await this.adminUseCase.deleteProduto(id);
  }
}
