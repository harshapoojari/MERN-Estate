// import React from 'react'

import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice.js';
import {useNavigate} from 'react-router-dom';


export default function OAuth() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const handleGoogleClick=async ()=>{
  try{
    const provider=new GoogleAuthProvider();
    const auth=getAuth(app);
    const res=await signInWithPopup(auth,provider);
   const result=await fetch('/api/auth/google',{
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify({name:res.user.displayName,email:res.user.email,photo:res.user.photoURL})
    
   })
   const data=await result.json();
   console.log(data);
   dispatch(signInSuccess(data));
   navigate('/')
   alert("Successfully loggged in")
   
  }catch(error){
console.log('couldnt signin with google',);
  }
    }
  return (
    
        <button onClick={handleGoogleClick} type="button" className="text-white bg-red-700 p-3 rounded-lg uppercase hover:opacity-95">continue with google</button>
  
  )
}

    