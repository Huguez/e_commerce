import { DefaultSession } from "next-auth";

declare module 'next-auth' {
   interface Session {
      user: {
         id: string;
         name: string;
         email: string;
         emailVerifed?: boolean;
         role: string;
         imageProfile: string;
         staus: 'active' | 'unverified' | 'banned';
      } & DefaultSession['user'];
   }
}
