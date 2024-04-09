import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    template: "%s | E-Commerce",
    default: "E-Commerce"
  },
  description: "E-Commerce by Huguez, developed with Next.js",
};

interface propsI { 
  children: React.ReactNode;
}

export default function RootLayout({ children, }: Readonly<propsI> ) {
  
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
