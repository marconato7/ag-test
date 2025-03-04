# AG TEST - Teste Técnico para a posição de programador Node.js/NestJS

## Instruções de instalação e execução

Requisitos:
- Docker

Executar o comando abaixo em seu terminal:
```sh
docker compose up --build -d
```
  
Isso fará com que a aplicação suba e os seguintes endpoints sejam disponibilizados:

| Método | URL                                    | Descrição                      | Requer autenticação/token |
| ------ | -------------------------------------- | ------------------------------ | ------------------------- |
| GET    | http://localhost:3000/produtos         | Listar todos os produtos       | Não                       |
| GET    | http://localhost:3000/produtos/:codigo | Buscar um produto pelo código  | Não                       |
| POST   | http://localhost:3000/produtos         | Criar um novo produto          | Sim                       |
| PUT    | http://localhost:3000/produtos/:codigo | Atualizar um produto existente | Sim                       |
| DELETE | http://localhost:3000/produtos/:codigo | Remover um produto             | Sim                       |
| POST   | http://localhost:3000/api/users/signup | Cadastrar um usuário           | Não                       |
| POST   | http://localhost:3000/api/users/signin | Logar um usuário               | Não                       |
| GET    | http://localhost:3000/openapi          | Swagger UI                     | Não                       |

## Arquivo Swagger/OpenAI

O arquivo Swagger/OpenAPI para importação em ferramentas de teste pode ser encontrado nas URLs abaixo:

| Formato do arquivo | URL do arquivo                      |
| ------------------ | ----------------------------------- |
| JSON               | http://localhost:3000/openapi-json  |
| YAML               | http://localhost:3000/openapi-yaml  |

## Explicação sobre as decisões técnicas adotadas durante o desenvolvimento

### Containerização

- A containerização que empreguei é para uso durante o desenvolvimento local e é bem primitiva
- Para o ambiente de produção ou até mesmo para um ambiente de desenvolvimento mais profissional/sofisticado, um novo ```Dockerfile``` e ```docker-compose.yml``` devem ser elaborados

### Banco de Dados

- O script responsável por montar o `schema` da solução pode ser encontrado em ```/docker/mariadb/schema.sql```

- Não rejeitei a utilização do tipo ```decimal``` para o campo de ```quantidade``` do ```produto``` pois segui estritamente aquilo que está contido no documento com os requisitos funcionais. De fato, despertou curiosidade, mas eu teria que possuir acesso ao responsável por esta decisão para questioná-lo o que embasou essa escolha e se devemos reconsiderar esta escolha

### Boas Práticas e Considerações

- Tentei manter o código simples e objetivo

- O código que escrevo é carregado de opiniões, principalmente no que diz respeito a formatação/indentação do código-fonte 😂

- Sou adepto da Arquitetura Limpa (_Clean Architecture_) e _Domain-driven Design_ (DDD), mas não incorporei muito disso na solução por se tratar de um projeto extremamente simples

- Não utilizei Inteligência Articial para confeccionar o meu código. Para me auxiliar no desenvolvimento, utilizei estritamente [a documentação oficial do framework](https://docs.nestjs.com/), Google e Stack Overflow, além de cursos no YouTube

- Não me atrevi a empregar a biblioteca ```Zod``` pois não estou familiarizada com ela. Prefiro estudá-la e somente então aplicá-la na solução. Como validação, utilizei apenas aquilo o que o framework disponibiliza

- Há muitas oportunidades para melhorias, principalmente nas questões de validação, autenticação, consultas no banco (estou utilizando um ORM, que geralmente não é performático em consultas/_queries_), etc

- Na pasta ```postman```, disponibilizei a coleção que utilizei para executar testes durante o desenvolvimento (ela contém alguns _scripts_ que setam variáveis de coleção para facilitar a execução dos testes e também alguns _helpers_ para agilizar criação de produtos e usuários). Não inclui nenhum tipo de teste na solução (unitário, funcional, _smoke test_, etc)

- Em caso de dúvidas, ficaria feliz em trocar uma idéia com vocês sobre a minha solução e sobre aquilo que sei 😉


## Exemplos de requisições e respostas da API

### Registrando um usuário

Endpoint

```
POST http://localhost:3000/api/users/signup
```

JSON da requisição
```json
{
    "username": "ag_test",
    "email": "test@agsystems.com",
    "password": "Abcdefghijk#0123456789"
}
```

JSON da resposta
```json
{
    "id": "019562c4-21de-7239-9513-80e3c8fedf5b",
    "username": "g_test",
    "email": "test@agsystems.com",
    "passwordHash": "$2b$10$FlsLxKYgAyg.0qjqn8KviuoIfIWRFH3dvJgZUsva3juhw0EGaT3p6"
}
```

### Logando um usuário

Endpoint

```
POST http://localhost:3000/api/users/signin
```

JSON da requisição
```json
{
    "username": "ag_test",
    "password": "Abcdefghijk#0123456789"
}
```

JSON da resposta
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTk1NjJjNC0yMWRlLTcyMzktOTUxMy04MGUzYzhmZWRmNWIiLCJ1c2VybmFtZSI6IiRNYWRpZS5Ucm9tcDg0IiwiZW1haWwiOiIkUGF1bGE3NUBob3RtYWlsLmNvbSIsImlhdCI6MTc0MTExODc4OSwiZXhwIjoxNzQxMTIyMzg5LCJhdWQiOiJhZ190ZXN0IiwiaXNzIjoiYWdfdGVzdCJ9.NOrSyCq4p5h_fA0Sb-XC6ICzCLBrPm4F-zWl2Z52EhA"
}
```

### Criando um produto

Endpoint

```
POST http://localhost:3000/produtos
```

JSON da requisição
```json
{    
    "nome": "Licensed Wooden Car",
    "codigo_barras": "#3f1634",
    "quantidade": 196,
    "preco": 102.07
}
```

JSON da resposta
```json
{
    "codigo": "019562d2-6802-7669-822c-4b55c040d236",
    "nome": "Licensed Wooden Car",
    "codigo_barras": "#3f1634",
    "quantidade": 196,
    "preco": 102.07
}
```

## Autenticação

Para endpoints que exigem autenticação (_token_), o seguinte cabeçalho HTTP (_header_) deve ser disponibilizado nas requisições:

```http
Authentication: Bearer {{ access_token }}
```

