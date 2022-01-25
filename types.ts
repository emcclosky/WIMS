export type Product = {
	id: number;
	name: string;
	url: string;
	image: string;
	inStock: boolean | null;
	keyword: string;
	updated: string;
};

export type Products = Product[];
