require("dotenv").config();
import express from "express";
import cors from "cors";
import { getAllProducts } from "./db";

const app = express();
app.use(cors(), express.json());

app.get("/products", async (_, res) => {
	try {
		const result = await getAllProducts();
		return res.send(result).status(200);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
