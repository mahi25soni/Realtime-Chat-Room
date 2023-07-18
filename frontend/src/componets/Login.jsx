import React from 'react'
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
    <div className='bg-purple-100 h-full '>
      <div className='p-4 lg:p-10 sm:p-8'>
     <h1 className='font-bold text-3xl text-black mb-8'>Sign In</h1>
      <form action="">
      <input className='block w-full border-b-4 border-purple-800 mb-4 outline-none bg-purple-100' type="text" name="username" id="username" placeholder='Username' />
      <input className='block w-full border-b-4 border-purple-800 mb-12 outline-none bg-purple-100' type="text" name='password' id='password' placeholder='Password' />
      <button type='submit' className='block w-full bg-purple-400 py-2 rounded-lg font-semibold text-lg mb-8 hover:ring-4 ring-purple-500 transition duration-300'>Continue</button>
      </form>

      <p className='text-sm text-black mb-4 text-center'>Don't have a account? <Link to="/signup" className='no-underline text-blue-500'>Sign Up</Link></p>
      <button className='block w-full bg-blue-300 py-2 font-semibold text-lg mb-8 hover:ring-4 ring-blue-400 transition duration-300'>Google</button>

      <button className='block w-full bg-blue-500 py-2 font-semibold text-lg mb-8 hover:ring-4 ring-blue-600 transition duration-300'>Facebook</button>

      </div>
    </div>
    </>
  )
}
