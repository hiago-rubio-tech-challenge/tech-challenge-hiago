export interface CadastroSchema {
  _id?: string;
  id: string;
  email: string;
  cpf: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CadastroBody {
  email: string;
  cpf: string;
  nome: string;
}
