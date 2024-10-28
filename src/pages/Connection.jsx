import React, { useState } from 'react'
import OAuth from '../components/OAuth';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
export default function Connection() {
  const [sign, setSign] = useState("signin")
  const [formData, setFormData] = useState({
    emailIn: "",
    emailUp: "",
    passwordIn: "",
    passwordUp: "",
    nameUp: "",
    emailReset: "",

  });
  const {
    emailIn,
    emailUp,
    passwordIn,
    passwordUp,
    nameUp,
    emailReset
  } = formData;
  const navigate = useNavigate()
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
 
      async function onSubmit(e){
        e.preventDefault();
        const auth = getAuth()
        if(sign === "signup"){
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailUp, passwordUp)
            const user = userCredential.user
            
            updateProfile(auth.currentUser, {
              displayName: nameUp
            })
            const formDataCopy = {...formData}
            delete formDataCopy.passwordUp
            delete formDataCopy.passwordIn
            delete formDataCopy.emailIn
            formDataCopy.timestamp = serverTimestamp()
            await setDoc(doc(db, "users", user.uid), formDataCopy)
            console.log(user);
            navigate("/")         
          } catch (error) {
            toast.error("something went wrong !")
            console.log(error)
            
          }
        }

        if(sign === "signin"){
          try {
            await signInWithEmailAndPassword(auth, emailIn, passwordIn)
            navigate("/")
          } catch (error) {
            switch (error.code) {
              case "auth/invalid-email":
                toast.error("Incorrect email")
                break;
              case "auth/invalid-credential":
                toast.error("Incorrect password")
                break;
            
              default:
                toast.error("Something went wrong")
                break;
            }
            console.log(error);
            
          }
        }

        if(sign === "resetpass"){
          try {
            await sendPasswordResetEmail(auth, emailReset)
            toast.success("Email was sent")
          } catch (error) {
            toast.error("could not send reset password")
            
          }
        }
      }
    

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mt-12">
        <form onSubmit={onSubmit}>
        <div className="w-full px-7 md:w-[50%] mx-auto flex space-x-1 mb-6">
          <button type="button" id='sign' onClick={()=>(setSign("signin"))} onChange={onChange} value="signin" className={`bg-white w-full px-7 py-2 whitespace-nowrap rounded text-sm font-bold shadow-md ${sign === "signin" ? "bg-blue-500 text-white" : " bg-white text-black"}`}>Sign in</button>
          <button type="button" id='sign' onClick={()=>(setSign("signup"))}  onChange={onChange} value="signup" className={`bg-white w-full px-7 py-2 whitespace-nowrap rounded text-sm font-bold shadow-md ${sign === "signup" ? "bg-blue-500 text-white" : " bg-white text-black"}`}>Sign up</button>

          {sign === "resetpass" && (
            <button type="button" id='sign' onClick={()=>(setSign("resetpass"))}  onChange={onChange} value="resetpass" className={`bg-white w-full px-2 py-2 whitespace-nowrap rounded text-sm font-bold shadow-md ${sign === "resetpass" ? "bg-blue-500 text-black" : "bg-white text-black"}`}>Forgot password</button>
          )}
          
        </div>
        
        {/* SIGN IN PAGES */}
        {sign === "signin" && (
          <div className="w-full px-7 md:w-[50%] mx-auto mb-6">
            <p>E-mail</p>
            <input 
            type="email" 
            id="emailIn" 
            value={emailIn} 
            placeholder='ex: john@gmail.com'
            className='w-full px-3 py-2 bg-white text-gray-800 font-medium text-sm rounded shadow-md mb-6 border outline-none focus:border-blue-500' 
            onChange={onChange}/>

            <p>Password</p>
            <input 
            type="password" 
            id="passwordIn" 
            value={passwordIn} 
            placeholder='Password' 
            className='w-full px-3 py-2 bg-white text-gray-800 font-medium text-sm rounded shadow-md mb-6 border outline-none focus:border-blue-500' 
            onChange={onChange}/>

            <button type="submit" className='bg-blue-600 w-full px-7 py-2 rounded text-white text-sm font-semibold text-center shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out mb-3 uppercase'>Sign in</button>
            <div className="w-full text-sm flex justify-between">
                <p className='whitespace-nowrap'>Don't have an account ? <span onClick={()=>(setSign("signup"))} className='text-red-500 hover:text-red-600 cursor-pointer'>Sign up</span></p>
                <p onClick={() => setSign("resetpass")} className='whitespace-nowrap text-blue-600 hover:text-blue-700 cursor-pointer'>Forgot password ?</p>
            </div>
          </div>
        )}

        {/* SIGN UP PAGES */}
        {sign === "signup" && (
          <div className="w-full px-7 md:w-[50%] mx-auto mb-6">
            <p>Name</p>
            <input 
            type="text" 
            id="nameUp" 
            value={nameUp} 
            placeholder='Name'
            className='w-full px-3 py-2 bg-white text-gray-800 font-medium text-sm rounded shadow-md mb-6 border outline-none focus:border-blue-500' 
            onChange={onChange}/>
            <p>E-mail</p>
            <input 
            type="email" 
            id="emailUp" 
            value={emailUp} 
            placeholder='ex: john@gmail.com'
            className='w-full px-3 py-2 bg-white text-gray-800 font-medium text-sm rounded shadow-md mb-6 border outline-none focus:border-blue-500' 
            onChange={onChange}/>

            <p>Password</p>
            <input 
            type="password" 
            id="passwordUp" 
            value={passwordUp} 
            placeholder='Password' 
            className='w-full px-3 py-2 bg-white text-gray-800 font-medium text-sm rounded shadow-md mb-6 border outline-none focus:border-blue-500' 
            onChange={onChange}/>

            <button type="submit" className='bg-blue-600 w-full px-7 py-2 rounded text-white text-sm font-semibold text-center shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out mb-3 uppercase'>Sign up</button>
            <p className='text-sm'>Have an account ? <span onClick={()=>(setSign("signin"))} className='text-red-500 hover:text-red-600 cursor-pointer'>Sign in</span></p>
          </div>
        )}

        {/* RESET PASSWORD PAGES */}
        {sign === "resetpass" && (
          <div className="w-full px-7 md:w-[50%] mx-auto mb-6">
            <p>E-mail</p>
            <input 
            type="email" 
            id="emailReset" 
            value={emailReset} 
            placeholder='ex: john@gmail.com'
            className='w-full px-3 py-2 bg-white text-gray-800 font-medium text-sm rounded shadow-md mb-6 border outline-none focus:border-blue-500' 
            onChange={onChange}/>

            <button type="submit" className='bg-blue-600 w-full px-7 py-2 rounded text-white text-sm font-semibold text-center shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out mb-3 uppercase'>send reset password</button>
            <p className='text-sm'><span onClick={()=>(setSign("signin"))} className='text-red-500 hover:text-red-600 cursor-pointer'>Sign in</span> instead</p>
         </div>
        )}
        </form>

        <div className="w-full px-7 mx-auto md:w-[50%] before:border-t flex items-center before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 mb-6">
          <p className='mx-2'>OR</p>
        </div>
        <OAuth/>
      </div>
    </div>
    
  )
}
