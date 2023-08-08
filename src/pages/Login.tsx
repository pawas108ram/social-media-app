
import {auth ,provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
 
  const navigate=useNavigate();
  const signInWithGoogle=async()=>{
      const res=await signInWithPopup(auth,provider);
      console.log(res);
      navigate('/');
  }
  
  return (
   <div className="flex flex-col gap-8 items-center p-8 ">
    <p className="font-bold text-4xl text-slate-800  hover:opacity-90 hover:sclae-105 hover:duration-150">Sign in with google</p>
    <button onClick={signInWithGoogle} className="px-8 py-4 bg-orange-500 rounded-lg  text-xl text-white hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 hover:duration-500">Sign In</button>
   </div>
  )
}


