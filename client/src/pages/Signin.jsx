// import React from 'react'
import { Link,useNavigate} from "react-router-dom";
import { useState } from "react";
export default function Signin() {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false)
const navigate=useNavigate();


  const handleChange=(ev)=>{
    setFormData({
      ...formData,[ev.target.id]:ev.target.value,
    })
  }
  
  const handleSubmit=async (ev)=>{
    ev.preventDefault();
    try{
      setLoading(true)
      const res= await fetch('/api/auth/signin',{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify(formData)
     
       });
       const data=await res.json();
       if(data.success==false)
       {
         setError(data.message);
         setLoading(false)
         return;
       }
       setLoading(false);
       setError(null)
       navigate('/')
       alert("Successfully logged in")
    }catch(error){
     setLoading(false)
     setError(error.message)
    }
    

  }
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
         <input type="email" placeholder="email"
        className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
         <input type="password" placeholder="password"
        className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
        <button disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase disabled:opacity-80 hover:opacity-95 ">
          {loading?"Loading...":"Sign In"}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?<Link to='/sign-up'><span className="text-blue-500"> Sign up</span></Link></p>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}


 
  // return (
  //   <div className="max-w-lg mx-auto p-3">
  //     <h1 className="text-3xl text-center text-slate-900 font-semibold my-7">Sign In</h1>
  //     <form action="" className="flex flex-col gap-4">
  //       <input type="email" name="" id="email"  placeholder="email" className="p-3 rounded-lg border"/>
  //       <input type="password" name="" id="password" placeholder="password" className="p-3 rounded-lg border"/>
  //       <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95">Sign in</button>
  //     </form>
  //      <div>
  //       <p className="mt-7">Dont have account?<Link to="/sign-up"><span className="text-blue-500"> Register</span> </Link></p>
  //      </div>
  //   </div>
  // )