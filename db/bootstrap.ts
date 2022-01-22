import { query } from "./index";

const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    url TEXT,
    in_stock BOOLEAN,
    keyword TEXT,
    created TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

const productsCount = "SELECT COUNT(*) FROM products;";

const seedProducts = `
  INSERT into products (url, keyword)
  VALUES ($1, $2);
`;

(async function () {
	await query(createProductsTable);
	const productsCountResult = await query<{ count: string }>(productsCount);

	if (
		productsCountResult &&
		parseInt(productsCountResult?.rows[0].count) === 0
	) {
		await query(seedProducts, [
			"https://shop.lululemon.com/p/womens-leggings/Wunder-Train-HR-Tight-25/_/prod9750562?color=47870&sz=4",
			"Add to Bag",
		]);
		await query(seedProducts, [
			"https://shop.lululemon.com/p/women-crops/Swift-Speed-High-Rise-Crop-23/_/prod10520368?color=0001&sz=4",
			"Add to Bag",
		]);
		await query(seedProducts, [
			"https://www.garagegrowngear.com/collections/mens-clothing/products/mens-torrid-apex-jacket-by-enlightened-equipment?variant=15844953817162",
			"Sold out",
		]);
	}
})();
