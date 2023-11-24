// import React from 'react'
import { Link } from "react-router-dom"
export default function Signin() {
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center text-slate-900 font-semibold my-7">Sign In</h1>
      <form action="" className="flex flex-col gap-4">
        <input type="email" name="" id="email"  placeholder="email" className="p-3 rounded-lg border"/>
        <input type="password" name="" id="password" placeholder="password" className="p-3 rounded-lg border"/>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95">Sign in</button>
      </form>
       <div>
        <p className="mt-7">Dont have account?<Link to="/sign-up"><span className="text-blue-500"> Register</span> </Link></p>
       </div>
    </div>
  )
}
