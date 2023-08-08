import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc,collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


interface createFormData{
    title:string;
    description:string;
  }
export const CreateForm= () => {
    const [user]=useAuthState(auth);
    const schema =yup.object().shape({
        title:yup.string().required("You must add a title to the post"),
        description:yup.string().min(20,"The description must be more than 20 characters").max(100,"The title must be less than 100 characters").required("You have to enter a valid description for the post"),

    })
    const {register,handleSubmit,formState:{errors}}=useForm<createFormData>({
        resolver:yupResolver(schema),
    })
    const postRefs=collection(db,'posts');
    const submitPost=async(data:createFormData)=>{
        await addDoc(postRefs,{
            title:data.title,
            description:data.description,
            username:user?.displayName,
            userid:user?.uid,
        })
    }
  return (
    <form onSubmit={handleSubmit(submitPost)} className='flex flex-col gap-4 p-20 m-12 rounded-lg bg-teal-500 font-sans text-xl'>
        <input className='p-2 font-semibold rounded-md focus:outline-none 'type="text" placeholder='Title....' {...register('title')}/>
        <p className='text-red-500 text-xl font-sans'>{errors.title?.message}</p>
        <textarea className='p-2 font-semibold rounded-md focus:outline-none resize-none h-56 '   placeholder='Description...' {...register("description")}/>
        <p className='text-red-500 text-xl font-sans' >{errors.description?.message}</p>
        <input className='px-6 py-3 font-bold bg-white self-center rounded-lg ring-2 ring-black ring-offset-1 my-4 cursor-pointer ' type="submit" />
    </form>
  )
}


