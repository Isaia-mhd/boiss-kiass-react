import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
export default function OAuth() {
  const navigate = useNavigate()
  async function onClick(){
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check the user in firestore
      const docInfo = doc(db, "users", user.uid)
      const docSnap = await getDoc(docInfo)
      if(!docSnap.exists()){
        await setDoc(docInfo, {
          nameUp: user.displayName,
          emailUp: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate("/")
    } catch (error) {
      toast.error("Could not authorize with google")
      console.log(error); 
    }
  
  }
  return (
    <div className='w-full md:w-[50%] mx-auto px-7'>
        <button type='button' onClick={onClick} className='w-full bg-red-800 px-7 py-3 rounded text-white uppercase text-sm font-medium shadow-md hover:bg-red-900 hover:shadow-lg'>Continue with Google</button>
    </div>
  )
}
