import { Size } from "@/interfaces";

export interface CartProduct {
   id: string;
   slug: string;
   title: string;
   price: number;
   qty: number;
   size: Size;
   image: string;
}