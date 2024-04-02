
 interface propsI { 
   children: React.ReactNode; 
}

export default function AuthLayout({ children }: propsI) {
  return (
    <div className="min-h-screen bg-gray-500">
      { children }
    </div>
  );
}