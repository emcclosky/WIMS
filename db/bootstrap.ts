require("dotenv").config();
import { query } from "./index";

const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
		name TEXT,
    url TEXT,
    available BOOLEAN,
    keyword TEXT,
    image TEXT,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW()
  );
`;

const productsCount = "SELECT COUNT(*) FROM products;";

const seedProducts = `
  INSERT into products (name, url, image, keyword)
  VALUES ($1, $2, $3, $4);
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
			"https://images.lululemon.com/is/image/lululemon/LW5CQDS_047870_1?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
			"Add to Bag",
		]);
		await query(seedProducts, [
			"Swift Speed High-Rise Crop 23",
			"https://shop.lululemon.com/p/women-crops/Swift-Speed-High-Rise-Crop-23/_/prod10520368?color=0001&sz=4",
			"https://images.lululemon.com/is/image/lululemon/LW6CAKS_0001_1?wid=1600&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
			"Add to Bag",
		]);
		await query(seedProducts, [
			"Treasure Dress by Youer",
			"https://www.garagegrowngear.com/collections/women/products/treasure-dress-by-youer?variant=41950011392187",
			"https://cdn.shopify.com/s/files/1/0537/1177/products/Untitleddesign_16_deddbfbe-3cc3-4bb8-a7a8-faf4110a463d_500x.png?v=1635187543",
			"Sold out",
		]);
	}
})();
