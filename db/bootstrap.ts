import { query } from "./index";

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  url TEXT,
  in_stock BOOLEAN,
  keyword TEXT,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP NOT NULL DEFAULT NOW()
);
`;

query(createProductsTable);
