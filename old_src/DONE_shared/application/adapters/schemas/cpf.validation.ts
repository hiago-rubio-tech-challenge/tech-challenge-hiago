import { cpf } from "cpf-cnpj-validator";

export function cpfValidation(value: string) {
  return cpf.isValid(value);
}
