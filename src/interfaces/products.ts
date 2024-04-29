import { Gender } from "./user";

export interface Product {
   id: string;
   description: string;
   images?: ProductImage[];
   inStock: number;
   price: number;
   sizes: Size[];
   slug: string;
   tags: string[];
   title: string;
   gender: Gender;
}

export interface ProductImage { 
   url: string; 
   id: string;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Tags = 'shirts'|'pants'|'hoodies'|'hats';

export interface SeedData {
   products: Product[],
}
