# BLOGG

Projeto simples de uma api para um blog para treinar o uso:

- Prisma
- Typescript
- Postgress
- Express

## DEV

- Banco de dados

```sh
$ docker-compose up -d
$ npx prisma migrate dev
```

- Aplicacao

1. troca o nome do aquivo `.env.example` para `.env`;

2. rode o comando `npm run dev`

## Test

Foi feita a implementação de testes `e2e` mas estão imcompletos e provevelmente falhando...

- Banco de dados

```sh
$ docker-compose up -d
$ npx prisma migrate dev
```

- Aplicação

1. troca o nome do aquivo `.env.example` para `.env`;

2. rode o comando `npm test`
