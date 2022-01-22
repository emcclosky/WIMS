import puppeteer from "puppeteer";

const products = [
	{
		url: "https://shop.lululemon.com/p/womens-leggings/Unlimit-HighRise-Tight-25/_/prod9960879?color=30210&sz=4",
		inStock: null,
		keyword: "out of stock",
	},
];

type Product = {
	url: string;
	inStock: boolean | null;
	keyword: string;
};

type Products = Product[];

const getInStockProducts = async (products: Products) => {
	try {
		const browser = await initPuppeteer();

		for (const product of products) {
			product.inStock = await keywordPresent(browser, product);
		}
	} catch (err) {
		console.error("error:", err);
	}
};

// TODO: lululemon blocks requests when running in headless
const initPuppeteer = async () => {
	return puppeteer.launch({ headless: false });
};

const keywordPresent = async (browser: puppeteer.Browser, product: Product) => {
	const page = await browser.newPage();
	await page.goto(product.url);
	const html = await page.content();
	return !html.toLowerCase().match(product.keyword);
};

// takes bool and filters for only in stock
// const filterInStock = () => {};

getInStockProducts(products);
