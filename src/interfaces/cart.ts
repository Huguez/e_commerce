import { Size } from "@/interfaces";
import { ProductImage } from "./products";

export interface CartProduct {
   id: string;
   slug: string;
   title: string;
   price: number;
   qty: number;
   size: Size;
   image: string | ProductImage;
}