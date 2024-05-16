export interface ProductSchema {
  _id?: string;
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  delete?: boolean;
  deletedAt?: Date;
}

export interface CreateProductBody {
  name: string;
  category: string;
  price: number;
}

export interface UpdateProductBody {
  id: string;
  name: string;
  category: string;
  price: number;
}
