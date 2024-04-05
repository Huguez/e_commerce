
 interface propsI { 
   children: React.ReactNode; 
}

export default function AuthLayout({ children }: propsI) {
	return (
		<div className="flex justify-center">
			<div className="w-full sm:w-[350px] px-10">
				{ children }
			</div>
		</div>
	);
}