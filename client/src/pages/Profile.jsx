// import React from 'react'
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getStorage,ref,  uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import {app} from '../firebase.js'
export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user);
  const fileRef=useRef();
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileError,setFileError]=useState(false);
  const [formData, setFormData] = useState({});
  
  useEffect(()=>{
    if(file){
        handleFileUpload(file);
    }
  },[file]);




  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName=new Date().getTime()+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);
    uploadTask.on('state changed',
    (snapshot)=>{
   const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
   setFilePerc(Math.round(progress))

    },
    (error)=>{
      setFileError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
     
        setFormData({ ...formData, avatar: downloadURL })
  
       )
    },);
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-6">Profile</h1>
    <form action="" className="flex flex-col gap-4">
      <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="" id="" ref={fileRef} hidden accept="image/*"/>
     <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="" className="object-cover h-24 w-24 cursor-pointer rounded-full self-center "/>
   
   <p className="text-center text-md font-semibold"> {fileError ? 
    (<span className="text-red-700">Error in Uploading</span>)
    :
    filePerc > 0 && filePerc < 100 ?(<span className="text-slate-700">{`Uploading ${filePerc}`}</span>):filePerc==100 ? (<span className="text-green-700">Successfully Uploaded!</span>):('')
    }
    </p>
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
