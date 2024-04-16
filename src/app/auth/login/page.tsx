import { monse } from '@/config/fonts';
import { LoginForm } from './ui/loginForm/LoginForm';

export default function () {
   return (
      <main className="flex flex-col justify-center h-screen   ">
         <h1 className={ `${ monse.className } text-4xl text-start mb-5` }>Log-In</h1>

         <LoginForm />
         
      </main>
   );
}