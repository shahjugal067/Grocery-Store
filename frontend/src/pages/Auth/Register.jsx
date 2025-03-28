import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 
 import { toast } from 'react-toastify'
 import { setCredentials } from '../../redux/features/Auth/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { EyeOff, Loader, Mail, User } from 'lucide-react'
import { useRegisterMutation } from '../../redux/api/userSlice'

const Register = () => {

    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [register,{isLoading }] = useRegisterMutation()

    const {userInfo} = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect,userInfo]);

    const submitHandler = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password not matched")
        }else{
            try {
                const  res = await register({username, email,password }).unwrap();
                console.log(res)
                dispatch(setCredentials({...res}))
                navigate(redirect)
                toast.success("User registered success");
            } catch (error) {
                console.log(error)
                toast.error(error?.data?.message || error.error)
            }
        }
      
    }
  return (
    <div>
        <section className='pl-[10rem] flex flex-wrap items-center justify-center'>
        <div className='mr-[4rem] mt-[5rem] shadow-2xl p-8 rounded-lg  bg-neutral-100'>
            <h1 className='text-3xl text-center text-green-500 font-bold'>
                Register
            </h1>
            <form className="container w-full" onSubmit={submitHandler}>
            <div className='gap-4 mt-6'>
                    <User className='w-5 h-5 absolute mt-1.5 ml-2 text-yellow-600'/>
                    <input type="text" id='name' onChange={(e)=> setUserName(e.target.value)} value={username} placeholder='Name plz...'
                     className=' px-10 p-1 border border-yellow-400 rounded-lg w-full outline-none' /> 
                </div>
                
                <div className='gap-4 mt-6'>
                    <Mail className='w-5 h-5 absolute mt-1.5 ml-2 text-yellow-600'/>
                    <input type="email" id='email' onChange={(e)=> setEmail(e.target.value)} value={email} placeholder='Email plz...'
                     className=' px-10 p-1 border border-yellow-400 rounded-lg w-full outline-none' /> 
                </div>
                <div className='my-4'>
                    <EyeOff className='w-5 h-5 absolute mt-1.5 ml-2 text-yellow-600'/>
                    <input type="password" id='password' onChange={(e)=> setPassword(e.target.value)} value={password} placeholder='Password plz..'
                     className=' px-10 p-1 border border-yellow-400 rounded-lg w-full outline-none' /> 
                </div>
                <div className='my-4'>
                    <EyeOff className='w-5 h-5 absolute mt-1.5 ml-2 text-yellow-600'/>
                    <input type="password" id='confirmPassword' onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword} placeholder='Confirm Password plz..'
                     className=' px-10 p-1 border border-yellow-400 rounded-lg w-full outline-none' /> 
                </div>
                <p className=''>Already have an account?{' '} <span className='text-green-500 cursor-pointer' onClick={()=> navigate('/login')}>Login</span></p>
                <button disabled={isLoading} type='submit'
                className='w-full mt-4 bg-green-700 text-white p-2 cursor-pointer rounded-lg hover:bg-slate-600'>
                     { isLoading ? (
                       <div className='gap-4'>
                        <span className='flex items-center justify-center'><Loader className='w-5 h-5 animate-spin' />Loading</span>
                       </div>
                   ):(
                      <span>Sign Up</span>
                 )}
                </button>
                
            </form>
        </div>
        </section>
    </div>
  )
}

export default Register