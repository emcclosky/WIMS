import puppeteer from "puppeteer";
import { getAllInStockProducts, getAllProducts, updateProducts } from "./db";
import { Product } from "./types";

const getInStockProducts = async () => {
	const products = await getAllProducts();
	const browser = await initPuppeteer();

	try {
		for (const product of products) {
			product.inStock = await keywordPresent(browser, product);
		}

		await updateProducts(products);
		const inStockProducts = await getAllInStockProducts();
		console.log(inStockProducts);
	} catch (err) {
		console.error("error:", err);
	} finally {
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

getInStockProducts();
