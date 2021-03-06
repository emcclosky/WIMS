import nodemailer from "nodemailer";
import { Products } from "./types";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

export async function sendMail(availableProducts: Products) {
	const productLength = availableProducts.length;
	const verb = productLength > 1 ? "are" : "is";
	const plural = productLength > 1;
	const emailBody = availableProducts.reduce((body, product) => {
		return (body += `<li><a href="${product.url}">${product.name}</a></li>`);
	}, "");

	await transporter.sendMail({
		from: process.env.EMAIL_USER,
		to: process.env.EMAIL_PERSONAL,
		subject: `Your product${plural ? "s" : ""} ${verb} back in stock!`,
		html: `<ul>${emailBody}</ul>`,
	});
}
