export type Product = {
	id: number;
	url: string;
	inStock: boolean | null;
	keyword: string;
};

export type Products = Product[];
