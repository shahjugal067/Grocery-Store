import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/Auth/authSlice'
import { useProfileMutation } from '../../redux/api/userSlice'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [username,setUsername ] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth)

    const [updateProfile,{ isLoading: loadingUpdateProfile }] = useProfileMutation()

    useEffect(()=>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)

    },[userInfo.email,userInfo.username]);

    const dispatch = useDispatch()

    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password not matched")
        }else{
            try {
                const res = await updateProfile({_id:userInfo._id, username,email,password}).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Profile updated successfully")
            } catch (error) {
                console.log(error)
                toast.error(error?.data?.message || error.error)
            }
        }
    }
  return (
    <div className='container mx-auto p-4 mt-[10rem] '>
        <div className='flex justify-center align-center md:flex md:space-x-4'>
           <div className='md:w-1/3'>
           <h1 className='text-2xl mb-4'>Update the Profile</h1>

                <form onSubmit={submitHandler}>
                    <div className='mb-4 flex gap-4 '>
                        <label htmlFor="username">Name:</label>
                        <input type="text" placeholder='Enter Name..' 
                        className='form-input ml-20 p-1 rounded-sm w-full outline-none border border-green-400'
                        onChange={(e)=> setUsername(e.target.value)} value={username} />
                    </div> 
                    <div className='mb-4 flex gap-4 items-center justify-center'>
                        <label htmlFor="email">Email:</label>
                        <input type="text" placeholder='Enter emial..' 
                        className='form-input ml-20 p-1 rounded-sm w-full outline-none border border-green-400'
                        onChange={(e)=> setEmail(e.target.value)} value={email} />
                    </div>  
                    <div className='mb-4 flex gap-4 items-center justify-center'>
                        <label htmlFor="password">Password:</label>
                        <input type="text" placeholder='Enter password..' 
                        className='form-input ml-12 p-1 rounded-sm w-full outline-none border border-green-400'
                        onChange={(e)=> setPassword(e.target.value)} value={password} />
                    </div> 
                    <div className='mb-4 flex gap-2 items-center justify-center'>
                        <label>confirmPassword:</label>
                        <input type="text" placeholder='Enter confirm password..' 
                        className='form-input p-1 rounded-sm w-full outline-none border border-green-400'
                        onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </div>    
                    <div className='flex justify-between'>
                        <button type='submit'
                        className='bg-green-400 p-2 rounded-sm hover:bg-green-500 py-2 px-2'>
                            Update
                        </button>
                        <Link to='/user-orders' className='bg-green-400 p-2 rounded-sm hover:bg-green-500 py-2 px-2'>
                        My Orders
                        </Link>
                     </div> 
                </form>
           </div>
           {loadingUpdateProfile && <h1>Loading...</h1>}
        </div>
    </div>
  )
}

export default Profile