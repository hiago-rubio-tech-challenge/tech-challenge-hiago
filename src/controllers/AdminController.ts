import { Db } from "mongodb";
import { AdminRepository } from "../gateways";
import { AdminUseCase } from "../usecases";

export class AdminController {
  private adminRepository: AdminRepository;
  private AdminUseCase: AdminUseCase;

  constructor(private db: Db) {
    this.adminRepository = new AdminRepository(this.db);
    this.AdminUseCase = new AdminUseCase(this.adminRepository);
  }

  async createProduto() {
    // TODO - Implementar
  }

  async updateProduto() {
    // TODO - Implementar
  }

  async deleteProduto() {
    // TODO - Implementar
  }

  async getProdutosByCategory() {
    // TODO - Implementar
  }
}
