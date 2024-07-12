export interface ClientSchema {
  _id?: string;
  id: string;
  email: string;
  cpf: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CadastroBody {
  email: string;
  cpf: string;
  name: string;
}
