export type Product = {
	id: number;
	name: string;
	url: string;
	image: string;
	inStock: boolean | null;
	keyword: string;
};

export type Products = Product[];
