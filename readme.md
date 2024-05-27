# Tech Challenge Pós Tech Fiap

# Como Rodar o Projeto com Docker Compose

## Requisitos

- Docker: Para criar e gerenciar contêineres.
- Docker Compose: Para definir e executar aplicativos Docker com vários contêineres.

## Execução

1.  Clone o repositório do projeto em sua máquina local:

ssh:

```bash
git clone git@github.com:hiagorubio/tech-challenge-hiago.git
```

https:

```bash
git clone https://github.com/hiagorubio/tech-challenge-hiago.git
```

1. Acessa a pasta do arquivo:

```bash
cd tech-challenge-hiago
```

3. Inicie o docker compose

```bash
docker-compose up -d
```

## Execução local sem uso do docker

1. Siga os passos 1 e 2 do guia anterior
2. Certifique de ter o [node](https://nodejs.org/) instalado no seu computador;
3. Instale as dependencias:

```bash
npm install
```

4. Inicie uma instancia do mongo db com o docker:

```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

5. Inicie o projeto

```bash
npm run dev
```

1.Acesse http://localhost:3000/api-docs

# Documentação das APIs

Este é um guia de referência para as APIs disponíveis neste projeto.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- MongoDB
- Docker
- Docker Compose

## Endpoints Disponíveis

### 1. Cadastro de Usuário

#### `POST /cadastro`

Este endpoint é usado para cadastrar um novo usuário.

**Request Body:**

```json
{
  "name": "Nome do usuário",
  "email": "email@example.com",
  "cpf": "12345678900"
}
```

#### Respostas:

- 200 OK: Cadastro realizado com sucesso.
- 400 Bad Request: Se os dados fornecidos forem inválidos.
- 500 Internal Server Error: Se ocorrer um erro durante o cadastro.

### 2. Identificação do Cliente

#### `POST /identificacao`

Este endpoint é usado para identificar um cliente com base no CPF.

**Request Body:**

```json
{
  "cpf": "12345678900"
}
```

#### Respostas:

- 200 OK: Cliente identificado com sucesso. Retorna os detalhes do cliente.
- 400 Bad Request: Se o CPF fornecido for inválido.
- 500 Internal Server Error: Se ocorrer um erro durante a identificação do cliente.

### 3. Listagem de Produtos por Categoria (Admin)

#### `GET /admin/products/:category`

Este endpoint é usado para listar produtos com base em uma categoria.

**Parâmetros:**

- `:category` (string): Categoria dos produtos (por exemplo, "Lanches", "Bebidas").

#### Respostas:

- 200 OK: Retorna uma lista de produtos da categoria especificada.
- 400 Bad Request: Se a categoria fornecida for inválida.
- 500 Internal Server Error: Se ocorrer um erro durante a listagem dos produtos.

### 4. Atualização de Produto (Admin)

#### `PATCH /admin/products`

Este endpoint é usado para atualizar um produto.

**Request Body:**

```json
{
  "id": "id_do_produto",
  "name": "Novo nome do produto",
  "category": "Nova categoria do produto",
  "price": 10.99
}
```

#### Respostas:

- 200 OK: Produto atualizado com sucesso. Retorna os detalhes do produto atualizado.
- 400 Bad Request: Se os dados fornecidos forem inválidos.
- 500 Internal Server Error: Se ocorrer um erro durante a atualização do produto.

### 5. Exclusão de Produto (Admin)

#### `DELETE /admin/products`

Este endpoint é usado para excluir um produto.

**Request Body:**

```json
{
  "id": "id_do_produto"
}
```

#### Respostas:

- 200 OK: Produto excluído com sucesso.
- 400 Bad Request: Se o ID do produto fornecido for inválido.
- 500 Internal Server Error: Se ocorrer um erro durante a exclusão do produto.

### 6. Checkout de Pedido

#### `POST /pedido/checkout`

Este endpoint é usado para realizar o checkout de um pedido.

**Request Body:**

```json
{
  "client": {
    "id": "id_do_cliente",
    "name": "Nome do cliente"
  },
  "products": [
    {
      "id": "id_do_produto",
      "name": "Nome do produto",
      "category": "Categoria do produto",
      "price": 10.99
    }
  ],
  "totalValue": 10.99,
  "totalItens": 1
}
```

#### Respostas:

- 201 Created: Pedido realizado com sucesso. Retorna os detalhes do pedido.
- 400 Bad Request: Se os dados fornecidos forem inválidos.
- 500 Internal Server Error: Se ocorrer um erro durante o checkout do pedido.

### 7. Listagem de Pedidos

#### `GET /pedido`

Este endpoint é usado para listar pedidos com base em um status.

**Parâmetros de Cabeçalho:**

- `pedido_status` (string): Status do pedido (por exemplo, "RECEBIDO", "EM_PREPARO").

#### Respostas:

- 200 OK: Retorna uma lista de pedidos com base no status especificado.
- 500 Internal Server Error: Se ocorrer um erro durante a listagem dos pedidos.

## Como Executar o Projeto

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
2. Clone este repositório em sua máquina local.
3. Navegue até o diretório raiz do projeto.
4. Execute o comando `docker-compose up -d` para iniciar os serviços.
5. As APIs estarão disponíveis nos seguintes URLs:
   - Cadastro de Usuário: http://localhost:3000/cadastro
   - Identificação do Cliente: http://localhost:3000/identificacao
   - Listagem de Produtos: http://localhost:3000/admin/products/:category
   - Atualização de Produto: PATCH http://localhost:3000/admin/products
   - Exclusão de Produto: DELETE http://localhost:3000/admin/products
   - Checkout de Pedido: http://localhost:3000/pedido/checkout
   - Listagem de Pedidos: http://localhost:3000/pedido

Este é apenas um exemplo básico de documentação das APIs. Você pode personalizá-lo conforme necessário, incluindo informações adicionais sobre autenticação, autorização, tipos de dados aceitos e muito mais.
