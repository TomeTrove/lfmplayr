import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/media',
  schema: "./src/db/media-schema/**/*.ts",
  dialect: 'sqlite',
});