export class CPF {
  private readonly value: string;

  constructor(value: string) {
    if (!this.validateCPF(value)) {
      throw new Error("Invalid CPF");
    }
    this.value = value;
  }

  private validateCPF(cpf: string): boolean {
    // Implementação da validação de CPF
    const re = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/; // Simplificação: ajuste conforme necessário
    return re.test(cpf);
  }

  toString(): string {
    return this.value;
  }
}
