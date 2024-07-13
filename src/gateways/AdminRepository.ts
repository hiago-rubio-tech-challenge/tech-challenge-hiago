import { Db } from "mongodb";

export interface IAdminRepository {
  findProduct(): Promise<void>;
  createProduct(): Promise<void>;
  updateProduct(): Promise<void>;
  deleteProduct(): Promise<void>;
}

export class AdminRepository implements IAdminRepository {
  constructor(private db: Db) {
    console.log("AdminRepository created");
  }

  async findProduct() {
    console.log("AdminRepository.findProduct");
  }

  async createProduct() {
    console.log("AdminRepository.createProduct");
  }

  async updateProduct() {
    console.log("AdminRepository.updateProduct");
  }

  async deleteProduct() {
    console.log("AdminRepository.deleteProduct");
  }
}
