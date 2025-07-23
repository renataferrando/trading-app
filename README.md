This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js v22.17.1 (we recommend using nvm)
- npm v10.9.2
- Docker & Docker Compose
- Git

### How to run the database

To get your database up and running, follow these steps:

1.  **Create a `.env` file** in the root of the project and add your database connection string:
    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
    ```

2.  **Start the PostgreSQL container**:
    ```bash
    docker-compose up -d
    ```

### How to run the app

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3001`.

### How to seed data (if applicable)

To seed your database with initial data, run the following command:

```bash
npm run seed
```

