import { monse } from '@/config/fonts';
import { RegisterForm } from './ui';

export default function () {
   return (
      <main className="flex flex-col justify-center h-screen   ">
         <h1 className={ `${ monse.className } text-4xl text-start mb-5` }>Sign-Up</h1>
         <RegisterForm />
      </main>
   );
}