import { Link } from "react-router-dom"
import {auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'


export const  Navbar = () => {
  const [user]=useAuthState(auth);
  const LogUserOut=async()=>{
    await signOut(auth);

  }

  return (
   <div className="flex flex-row gap-8 bg-teal-400 items-center justify-end font-sans sticky top-0  ">
     <nav >
      <ul className=" font-bold text-xl flex gap-8 p-4 justify-center items-center ">
         {!user && <Link className="ring-1 ring-white ring-offset-2 py-2 px-6 rounded-md hover:scale-105 hover:duration-300 text-opacity-20"to="/Login"> Login</Link>}
        <Link  className="ring-1 ring-white ring-offset-2 py-2 px-6 rounded-md hover:scale-105 hover:duration-300 text-opacity-20" to="/">Main</Link>
        {user && <Link  className="ring-1 ring-white ring-offset-2 py-2 px-6 rounded-md hover:scale-105 hover:duration-300 text-opacity-20" to="/createpost">Create Post</Link>}
     
     
      </ul>
     </nav>
     {user &&
     <>
     <div className="flex flex-row items-center gap-4 font-semibold text-lg  ">
      <p className="font-bold text-center">{user?.displayName}</p>
      <div className="flex flex-col gap-2  mr-8 items-center py-1 px-4 my-2 rounded-md">
        <img className=' h-8 w-8 rounded-md 'src={user?.photoURL || ""} alt=""  width='20' height='20'/>
        <button className=' text-base font-semibold underline underline-offset-2'onClick={LogUserOut}>Logout</button>
      </div>

     </div>
     </>
}
   </div>
  )
}

