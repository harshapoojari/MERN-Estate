// import React from 'react'
import { useSelector ,useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getStorage,ref,  uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import {app} from '../firebase.js'
import { updateUserStart,updateUserSuccess,updateUserFailure } from "../redux/user/userSlice.js";
import {deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,signOutUserFailure,signOutUserStart,signOutUserSuccess} from "../redux/user/userSlice.js";


export default function Profile() {
  const {currentUser,loading ,error}=useSelector((state)=>state.user);
  const fileRef=useRef();
  const [file,setFile]=useState(undefined);
  const [filePerc,setFilePerc]=useState(0);
  const [fileError,setFileError]=useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false)
  const dispatch=useDispatch();
  
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
    ()=>{
      setFileError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
     
        setFormData({ ...formData, avatar: downloadURL })
  
       )
    },);
  }

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
const handleDeleteUser= async ()=>{
  try {
    dispatch(deleteUserStart())
    const res=await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
      
    })
    const data=await res.json();
    if(data.success===false){
        dispatch(deleteUserFailure(data.message))
    }
    dispatch(deleteUserSuccess(data));
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}

const handleSignOut=async()=>{
try {
  dispatch(signOutUserStart())
  const res=await fetch('/api/auth/signout');
  const data=await res.json();
  if(data.success===false)
  {
    dispatch(signOutUserFailure(data.message))
    return ;
  }
 dispatch(signOutUserSuccess(data))
} catch (error) {
  dispatch(signOutUserFailure(error.message))
}
}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-6">Profile</h1>
    <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="" id="" ref={fileRef} hidden accept="image/*"/>
     <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="" className="object-cover h-24 w-24 cursor-pointer rounded-full self-center "/>
   
   <p className="text-center text-md font-semibold"> {fileError ? 
    (<span className="text-red-700">Error in Uploading</span>)
    :
    filePerc > 0 && filePerc < 100 ?(<span className="text-slate-700">{`Uploading ${filePerc}`}</span>):filePerc==100 ? (<span className="text-green-700">Successfully Uploaded!</span>):('')
    }
    </p>
    <input type="text" id="username" placeholder="username" className="border rounded-lg p-3" defaultValue={currentUser.username}
    onChange={handleChange}/>
    <input type="email" id="email" placeholder="email" className="border rounded-lg p-3" defaultValue={currentUser.email}
    onChange={handleChange}/>
    <input type="password" id="password" placeholder="password" className="border rounded-lg p-3"
    onChange={handleChange}/>
    <button disabled={loading}  className="bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white">{loading?"Loading...":"Update"}</button>
    </form>
    <div className="flex justify-between mt-5">
      <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
      <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
    </div>
    <p className="text-red-700 mt-5">{error?error:""}</p>
    <p className="text-green-700">{updateSuccess?'Successsfully Updated User':""}</p>
    </div>
  )
}
