require("dotenv").config();
import { Client } from "pg";

const client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DATABASE,
});

client.connect();

export const query = async (query: string) => {
	try {
		await client.query(query);
	} catch (err) {
		console.error(err);
	} finally {
		client.end();
	}
};
