// import React from 'react'
import { useSelector } from "react-redux"
export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
    <form action="" className="flex flex-col gap-4">
      <img src={currentUser.avatar} alt="" className="object-cover h-24 w-24 cursor-pointer rounded-full self-center mt-2"/>
    <input type="text" id="username" placeholder="username" className="border rounded-lg p-3"/>
    <input type="email" id="email" placeholder="email" className="border rounded-lg p-3"/>
    <input type="password" id="password" placeholder="password" className="border rounded-lg p-3"/>
    <button className="bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white">Update</button>
    </form>
    <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer">Delete Account</span>
      <span className="text-red-700 cursor-pointer">Sign Out</span>
    </div>
    </div>
  )
}
