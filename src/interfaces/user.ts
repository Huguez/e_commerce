import { AddressI, OrderI } from "."

export type Gender = 'men' | 'women' | 'kid' | 'unisex'

export type Role = 'customer' | 'admin'

export type Status =  'active'  | 'unverified' | 'banned'

export interface UserI {
   id:            string
	name:          string
	email:         string
	emailVerifed?: Date;
	password:      string
	role:          Role;
	imageProfile?: string;
	status:        Status;
	address?:      AddressI;
	orders:        OrderI[]  
}
