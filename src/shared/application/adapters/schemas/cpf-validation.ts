export function cpfValidation(cpf: string) {
  if (!/^\d+$/.test(cpf)) {
    throw new Error("CPF inválido.");
  }

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    throw new Error("CPF inválido.");
  }

  let sum = 0;
  let mod;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf[i - 1]) * (11 - i);
  }

  mod = (sum * 10) % 11;

  if (mod === 10 || mod === 11) {
    mod = 0;
  }

  if (mod !== parseInt(cpf[9])) {
    throw new Error("CPF inválido.");
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf[i - 1]) * (12 - i);
  }

  mod = (sum * 10) % 11;

  if (mod === 10 || mod === 11) {
    mod = 0;
  }

  if (mod !== parseInt(cpf[10])) {
    throw new Error("CPF inválido.");
  }

  return cpf;
}
