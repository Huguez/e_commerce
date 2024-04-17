'use client'

import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form";
import { login, signUpUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
   name:     string;
   email:    string;
   password: string;
}

export const RegisterForm = () => {
   const [ msg, setMsg ] = useState<string>( '' )
   const { register, handleSubmit, formState: { errors }, } = useForm<FormInputs>()

   const onSubmit: SubmitHandler<FormInputs> = async (data) => {
      setMsg( '' )

      const { name, email, password } = data

      const resp = await signUpUser( name, email, password )

      if ( !resp.ok ) {
         setMsg( resp.msg )
         return;
      } else {
         await login( email.toLowerCase(), password )
         window.location.replace("/")
      }
   }

   return (
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            
         <input
            className={ `${ !errors.name ? "mb-5" : "border-red-500 mb-0 " } border outline-none px-5 py-2 bg-gray-200 rounded ` }
            type="text" 
            placeholder='Name'
            { ...register( 'name', { required: true } ) }
         />
         { errors.name?.type === "required" && <span className="text-sx text-red-500 px-5 my-2"> Name is required </span> }


         <input
            className={`${ !errors.email ? "mb-5" : "border-red-500" } outline-none px-5 py-2 border bg-gray-200 rounded `}
            type="email" 
            placeholder='E-mail'
            { ...register( 'email', { required: true, pattern: /^\S+@\S+$/i } ) }
         />
         { errors.email?.type === 'required' && <span className="text-sx text-red-500 px-5 my-2">E-mail is required</span> }

         <input
            className={`${ !errors.password ? "mb-5" : "border-red-500"  } outline-none px-5 py-2 border bg-gray-200 rounded`}
            type="password" 
            placeholder='Password'
            { ...register( 'password', { required: true, minLength: 5 } ) }
         />
         { errors.password?.type === 'required' && <span className="text-sx text-red-500 px-5 my-2"> Password is required </span> }
         { errors.password?.type === 'minLength' && <span className="text-sx text-red-500 px-5 my-2"> Password soo short   </span> }

         { msg !== '' && <span className="text-sm text-center text-red-500 px-5 my-2"> { msg } </span> }

         <button className="btn-secondary font-semibold outline-none" type='submit'>
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

      </form>
   )
}
