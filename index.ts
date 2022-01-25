require("dotenv").config();
import puppeteer from "puppeteer";
import { getAllInStockProducts, getAllProducts, updateProducts } from "./db";
import { Product } from "./types";
import { sendMail } from "./mail";

const getInStockProducts = async () => {
	const products = await getAllProducts();
	const browser = await initPuppeteer();

	try {
		for (const product of products) {
			product.inStock = await keywordPresent(browser, product);
		}

		await updateProducts(products);
		const inStockProducts = await getAllInStockProducts();
		await sendMail(inStockProducts);
		console.log(inStockProducts);
	} catch (err) {
		console.error("error:", err);
	} finally {
		await browser.close();
	}
};

const initPuppeteer = async () => {
	return puppeteer.launch({ headless: true });
};

const keywordPresent = async (browser: puppeteer.Browser, product: Product) => {
	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
	);
	await page.goto(product.url);

	return !(
		await page.$x(`//button[contains(., '${product.keyword}')][@disabled]`)
	).length;
};

getInStockProducts();
