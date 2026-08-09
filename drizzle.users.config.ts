import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/users',
  schema: "./src/db/users-schema/**/*.ts",
  dialect: 'sqlite',
});