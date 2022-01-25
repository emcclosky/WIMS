import { query } from "./index";
import { Product, Products } from "../types";

export const getAllProducts = async (): Promise<Products> => {
	const productsResult = await query<Product>("SELECT * FROM products");
	return productsResult.rows;
};

export const getAllAvailableProducts = async (): Promise<Products> => {
	const productsResult = await query<Product>(
		"SELECT * FROM products p WHERE p.available = true"
	);
	return productsResult.rows;
};

const updateProduct = async ({ id, available }: Product) => {
	const updateProduct = `
		UPDATE products AS p
		SET
      available = $1,
      updated = NOW()
		WHERE p.id = $2;
	`;

	await query<Product>(updateProduct, [available, id]);
};

export const updateProducts = async (products: Products) => {
	for (const product of products) {
		await updateProduct(product);
	}
};
