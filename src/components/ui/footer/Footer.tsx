import { monse } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
	return (
		<>
			<div className="w-full h-0.5 rounded-sm bg-gray-200 " />
			<footer className="flex w-full justify-center items-center text-xs h-[100px] ">

				<Link href={"/"}>
					<p className={ `${ monse.className } antialiased font-bold text-lg` }> E-commerce </p>
					<span className="text-xs">  By Huguez </span>

					<span> &copy; { new Date().getFullYear() } </span>
				</Link>
			</footer>
		</>
	) 
}
