import puppeteer from "puppeteer";

const products = [
	{
		url: "https://shop.lululemon.com/p/womens-leggings/Wunder-Train-HR-Tight-25/_/prod9750562?color=47870&sz=4",
		inStock: null,
		keyword: "Add to Bag",
	},
	{
		url: "https://shop.lululemon.com/p/women-crops/Swift-Speed-High-Rise-Crop-23/_/prod10520368?color=0001&sz=4",
		inStock: null,
		keyword: "Add to Bag",
	},
	{
		url: "https://www.garagegrowngear.com/collections/mens-clothing/products/mens-torrid-apex-jacket-by-enlightened-equipment?variant=15844953817162",
		inStock: null,
		keyword: "Sold out",
	},
];

type Product = {
	url: string;
	inStock: boolean | null;
	keyword: string;
};

type Products = Product[];

const getInStockProducts = async (products: Products) => {
	const browser = await initPuppeteer();

	try {
		for (const product of products) {
			product.inStock = await keywordPresent(browser, product);
		}
	} catch (err) {
		console.error("error:", err);
	} finally {
		console.log("products", products);
		await browser.close();
	}
};

// TODO: lululemon blocks requests when running in headless
const initPuppeteer = async () => {
	return puppeteer.launch({ headless: false });
};

const keywordPresent = async (browser: puppeteer.Browser, product: Product) => {
	const page = await browser.newPage();
	await page.goto(product.url);

	return !(
		await page.$x(`//button[contains(., '${product.keyword}')][@disabled]`)
	).length;
};

// takes bool and filters for only in stock
// const filterInStock = () => {};

getInStockProducts(products);
