import {getDocs,collection} from 'firebase/firestore'
import {db} from '../../config/firebase'
import {useEffect, useState} from 'react'
import {Post } from './Post'
interface Post{
  title:string;
  description:string;
  userid:string;
  username:string;
  id:string;
  
}
export const Home = () => {
  const [postList,setPostList]=useState<Post[]|null>(null);
  const postRefs=collection(db,'posts');
  const getPosts =async()=>{
    const data=await getDocs(postRefs);
    setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]);
    
  }
  useEffect(()=>{
    getPosts();
  },[])
  return (
    <div>
   { postList?.map((post)=>(
    <Post title={post.title} description={post.description} username={post.username} id={post.id} />
   ))}
    </div>
  )
}


