This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Prerequisites
Before you begin, make sure you have the following installed on your machine:
Node.js v22.17.1 (we recommend using nvm)
npm v10.9.2
Docker & Docker Compose
Git

## DB

DATABASE_URL: Connection string for local Postgres.
NEXTAUTH_SECRET: Random 32-byte string for token signing.

## Start postgres
docker-compose up -d

## Install deps
npm install

## Run dev server
npm run dev (http://localhost:3000)

