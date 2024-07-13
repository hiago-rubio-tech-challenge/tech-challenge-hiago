import { IAdminRepository } from "../gateways/AdminRepository";

export class AdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  async findProduct(): Promise<void> {
    return this.adminRepository.findProduct();
  }

  async createProduct(): Promise<void> {
    return this.adminRepository.createProduct();
  }

  async updateProduct(): Promise<void> {
    return this.adminRepository.updateProduct();
  }

  async deleteProduct(): Promise<void> {
    return this.adminRepository.deleteProduct();
  }
}
