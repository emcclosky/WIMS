import { query } from "./index";
import { Product, Products } from "../index";

export const getAllProducts = async (): Promise<Products> => {
	const productsResult = await query<Product>("SELECT * FROM products");
	return productsResult.rows;
};
