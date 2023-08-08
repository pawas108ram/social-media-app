import {FaThumbsUp,FaThumbsDown} from 'react-icons/fa6'
import { auth, db } from '../../config/firebase';
import { addDoc, collection,deleteDoc,doc,getDocs,query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
interface Post{
    title:string;
    description:string;
    username:string;
    id:string;

  
}
interface Like{
    likeid:string;
    userid:string;
}
export const Post = (props:Post) => {
    const likeRefs=collection(db,'likes');
    const [user]=useAuthState(auth);
    const [Likes,setLikes]=useState<Like[]|null>(null);
    const likeDocs=query(likeRefs, where("postid","==",props.id))
    const getLikes=async ()=>{
      const data= await getDocs(likeDocs);
      setLikes(data.docs.map((doc)=>({userid:doc.data().userid,likeid:doc.id})));
    }
    const hasUserLiked=Likes?.find((like)=>like.userid===user?.uid);
    useEffect(()=>{
        getLikes();
    },[]);
    const addLike=async()=>{

        try{
            const newDoc=await addDoc(likeRefs,{
                userid:user?.uid,
                postid:props.id,
    
            }
           
            );
            if(user){
                setLikes((prev)=>(
                    prev?[...prev,{userid:user.uid,likeid:newDoc.id}]:[{userid:user.uid,likeid:newDoc.id}]
                ))
            }
        }
        catch( e){
            console.log(e);
            
        }

           
        
    }
    const removeLike=async()=>{
        const LikeToDeleteQuery=query(likeRefs,where("postid","==",props.id),where("userid","==",user?.uid));
        const LikeToDeleteData=await getDocs( LikeToDeleteQuery);
        const LikeId=LikeToDeleteData.docs[0].id;
        const LikeToDelete=doc(db,"likes",LikeId);
        await deleteDoc(LikeToDelete);

        try{
            await addDoc(likeRefs,{
                userid:user?.uid,
                postid:props.id,
    
            }
           
            );
            if(user){
                setLikes((prev)=>(
                  prev&&   prev?.filter((like)=>like.likeid!==LikeId)
                ))
            }
        }
        catch( e){
            console.log(e);
            
        }

           
        
    }
  return (
    <div className="rounded-lg m-8 bg-teal-400 p-12 font-sans flex flex-col items-start gap-8 text-slate-700 ">
        <h1 className="font-bold text-2xl ">Title:{props.title}</h1>
        <p className="font-semibold bg-white p-6 rounded-md w-full text-xl ">Description:{props.description}</p>
        <div className="flex flex-row gap-4 items-center font-sans text-lg w-full">
            <p className="font-sans text-black font-normal text-xl tracking-wide">Username:{props.username}</p>
            <div className='flex flex-row gap-4 items-center text-black text-2xl'>
                <button onClick={hasUserLiked?removeLike:addLike} className='bg-white rounded-md p-2'>{hasUserLiked ? <FaThumbsDown/>:<FaThumbsUp/>}</button>
                {Likes && <p className='font-sans text-xl text-white tracking-wider '>Likes:{Likes?.length}</p>}
                
            </div>
            
        </div>
      
    </div>
  )
}


