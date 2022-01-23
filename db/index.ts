import { Pool } from "pg";
export {
	getAllProducts,
	getAllInStockProducts,
	updateProducts,
} from "./products";

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DATABASE,
});

export const query = async <T>(
	query: string,
	args: (boolean | string | number | null)[] = []
) => {
	let client;
	try {
		client = await pool.connect();
		const result = await client.query<T>(query, [...args]);
		client?.release();
		return result;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
