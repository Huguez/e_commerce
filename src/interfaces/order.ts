import type { Size } from "./products";

export interface OrderI {
   id: string;
   subtotal: number;
   tax: number;
   total: number;
   itemsInOrder: number;
   isPaid: boolean | null;
   delivered: Date | null;
   paidAt: Date | null;
   createdAt: Date;
   updatedAt: Date;
   userId: string;
}

export interface OrderItemI {
   id:        string;
	quantity:  number;
	price:     number;
	size:      Size;
	orderId:   string;
	productId: string;
}

export interface OrderAddressI {
   id:              string;
	name:            string;
   lastname:        string;
   address:         string;
   addressOptional?: string;
   codeZip:         string;
   city:            string;
   phone:           string;
	countryId:       string;
	orderId:         string;
}