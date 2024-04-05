import { monse } from '@/config/fonts';
import Link from 'next/link';

export default function () {
   return (
      <main className="flex flex-col justify-center h-screen   ">
         <h1 className={ `${ monse.className } text-4xl text-start mb-5` }>Sign-Up</h1>

         <div className="flex flex-col">
            
            <input
               className="px-5 py-2 border bg-gray-200 rounded mb-5"
               type="text" 
               placeholder='Name'
            />

            <input
               className="px-5 py-2 border bg-gray-200 rounded mb-5"
               type="email" 
               placeholder='E-mail'
            />

            <input
               className="px-5 py-2 border bg-gray-200 rounded mb-5"
               type="email" 
               placeholder='Password'
            />

            <input
               className="px-5 py-2 border bg-gray-200 rounded mb-5"
               type="email" 
               placeholder='Confirm password'
            />

            <button className="btn-secondary font-semibold">
               Sign-up
            </button>

            {/* divisor l ine */ }
            <div className="flex items-center my-5">
               <div className="flex-1 border-t border-gray-500"></div>
               <div className="px-2 text-gray-800">O</div>
               <div className="flex-1 border-t border-gray-500"></div>
            </div>
            
            <Link href="/auth/login" className="btn-link text-center">
               I have an account
            </Link>

         </div>
      </main>
   );
}