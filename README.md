# Gerenciador de Usuários e Autenticação

## Sistema a Ser Testado

O sistema básico fornecido é um **gerenciador de usuários e autenticação**, com as seguintes funcionalidades principais:

### 1. Cadastro de Usuário
- Permite cadastrar um usuário com **nome**, **email** e **senha**.
- Validações:
  - O **email** deve ser único (dois usuários não podem ter o mesmo email).
  - A **senha** deve atender aos requisitos de segurança:
    - Pelo menos **6 caracteres**.

### 2. Login
- Permite que o usuário faça login utilizando **email** e **senha**.
- Validações:
  - O **email** e a **senha** devem ser corretos.

  
---

## Regras de Negócio
1. **Email Único**: O sistema não permite duplicidade de emails.
2. **Requisitos de Senha**:
   - Pelo menos 6 caracteres.

---

### Estratégia de Testes

#### Testes Unitários com Jest
Os testes serão implementados para cobrir as funcionalidades e validar as regras de negócio:

##### **Cadastro de Usuário**
1. Verificar se o sistema aceita dados válidos de cadastro.
2. Testar a rejeição de emails duplicados.
3. Validar a rejeição de senhas curtas (menos de 6 caracteres).

##### **Login de Usuário**
1. Validar login bem-sucedido com credenciais corretas.
2. Testar falha de login com credenciais incorretas.
3. Verificar rejeição de login com email não cadastrado.

#### Testes de Exceção
- Validar se o sistema retorna mensagens claras e apropriadas para erros internos (ex.: erro 500).

#### Testes de Limite
- Verificar comportamento com senhas exatamente no limite (8 caracteres).
- Testar o comportamento com entradas inválidas (emails com formato incorreto).

---

### Planejamento de Refatoração e Melhoria Contínua
- Realizar **refatorações periódicas** baseadas nos resultados dos testes e métricas.
- Implementar uma **pipeline de CI/CD** para executar testes automaticamente.
- Implementar uma **Arquitetura Hexagonal** respeitando os princípios **SOLID**, para garantir uma maior modularidade, manutenabilidade e testabilidade

---

## Requisitos para Executar o Projeto

- **Node.js** (versão 16 ou superior).
- Banco de dados **MySQL**.

---

## Scripts Disponíveis

Aqui estão os principais comandos que podem ser usados para executar o projeto:

- **Iniciar o Projeto**:
  ```bash
  npm install            # Instala as dependências necessárias para executar o projeto
  ```

- **Rodar Testes Automatizados**:
  ```bash
  npm test               # Executa os testes unitários
  ```

---

## **Rotas Disponíveis**

### **1. Criar Usuário - `/users`**  
- **Método:** `POST`  
- **Descrição:** Permite cadastrar um novo usuário no sistema.  

#### **Parâmetros Esperados no Corpo da Requisição**:  
```json
{
  "nome": "string",
  "email": "string",
  "password": "string"
}
```   

#### **Resposta de Sucesso (200)**:  
```json
{
    "id": "int",
    "nome": "string",
    "email": "string"
}
```

#### **Resposta de Erro (400 | 500)**:  
```json
{
  "errors":  [
        "string"
    ]
}
```

### **2. Login de Usuário - `/login`**  
- **Método:** `POST`  
- **Descrição:** Permite que um usuário faça login no sistema e receba um token de autenticação.  

#### **Parâmetros Esperados no Corpo da Requisição**:  
```json
{
  "email": "string",
  "password": "string"
}
```  

#### **Resposta de Sucesso (200)**:  
```json
{
  "token": "string",
  "user": {
    "nome": "string",
    "id": "int",
    "email": "string"
  }
}
```

#### **Resposta de Erro (401 | 500)**:  
```json
{
  "errors":  [
        "string"
    ]
}
```

---

### 1. Inicializar o Ambiente
Para rodar o sistema, siga os passos abaixo:

1. **Gerar e Rodar as Migrations**:
   - Cria e aplica as tabelas no banco de dados.
   ```bash
   npx sequelize-cli db:migrate  
   ```

32 **Iniciar o Servidor**:
   - Inicia o sistema na porta configurada (geralmente `3000`).
   ```bash
   npm run dev
   ```

O sistema estará acessível em `http://localhost:3500`.

---

## Como Rodar os Testes

### 1. Testes Automatizados
Para garantir a funcionalidade do sistema, rode os testes automatizados com o seguinte comando:
```bash
npm test
```
Este comando executa todos os testes unitários.

---

## Observações

- Certifique-se de criar o banco de dados e modificar no arquivo .env.

### Resultados Esperados
- **Cobertura de Código**: Todos os cenários críticos cobertos.
- **Conformidade das Regras de Negócio**: O sistema deve rejeitar entradas inválidas e aceitar apenas dados válidos.
- **Desempenho**: Tempo de resposta dentro do limite especificado.