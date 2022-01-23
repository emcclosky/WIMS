require("dotenv").config();
import { query } from "./index";

const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
		name TEXT,
    url TEXT,
    in_stock BOOLEAN,
    keyword TEXT,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

const productsCount = "SELECT COUNT(*) FROM products;";

const seedProducts = `
  INSERT into products (name, url, keyword)
  VALUES ($1, $2, $3);
`;

(async function () {
	await query(createProductsTable);
	const productsCountResult = await query<{ count: string }>(productsCount);

	if (
		productsCountResult &&
		parseInt(productsCountResult?.rows[0].count) === 0
	) {
		await query(seedProducts, [
			"Wunder Train High-Rise Tight 25",
			"https://shop.lululemon.com/p/womens-leggings/Wunder-Train-HR-Tight-25/_/prod9750562?color=47870&sz=4",
			"Add to Bag",
		]);
		await query(seedProducts, [
			"Swift Speed High-Rise Crop 23",
			"https://shop.lululemon.com/p/women-crops/Swift-Speed-High-Rise-Crop-23/_/prod10520368?color=0001&sz=4",
			"Add to Bag",
		]);
		await query(seedProducts, [
			"Treasure Dress by Youer",
			"https://www.garagegrowngear.com/collections/women/products/treasure-dress-by-youer?variant=41950011392187",
			"Sold out",
		]);
	}
})();
