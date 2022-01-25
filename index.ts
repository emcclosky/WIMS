require("dotenv").config();
import puppeteer from "puppeteer";
import { getAllAvailableProducts, getAllProducts, updateProducts } from "./db";
import { Product } from "./types";
import { sendMail } from "./mail";

const getAvailableProducts = async () => {
	const products = await getAllProducts();
	const browser = await initPuppeteer();

	try {
		for (const product of products) {
			product.available = await keywordPresent(browser, product);
		}

		await updateProducts(products);
		const availableProducts = await getAllAvailableProducts();
		await sendMail(availableProducts);
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

getAvailableProducts();
