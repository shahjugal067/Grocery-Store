import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/userSlice'
import { Check, Edit, Loader, Timer, Trash2, X } from 'lucide-react'
import Message from '../../components/Message'

const UserList = () => {
    const { data:users, refetch, isLoading,error } = useGetUsersQuery()
    const [ deleteUser ] = useDeleteUserMutation()
    const [ updateUser ] = useUpdateUserMutation()

    const [ editableUserId, setEditableUserId ] = useState(null)
    const [ editableUsername,setEditableUsername ] = useState('')
    const [ editableUserEmail,setEditableUserEmail ] = useState('')

    useEffect(()=>{
        refetch();
    },[refetch]);
    console.log(users)

    const deleteHandler = async (id) =>{
        if(window.confirm('Are you sure?')){
            try {
                await deleteUser(id).unwrap();
                toast.success("User deleted successfully")
            } catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    };
    const toggleEdit = (id,username,email) =>{
        setEditableUserId(id)
        setEditableUsername(username)
        setEditableUserEmail(email)
    }

  return (
    <div className='p-4'>
        <h1 className='text-2xl mb-4'>User List</h1>
        {isLoading ? (
            <>
            <Loader className='animate-spin w-5 h-5' />
            <p>Loading...</p>
            </>
        ) :  error ? (
                 <Message variant='danger'>{error.data.message || error.message}</Message>
        ) : (
            <div className='flex flex-col md:flex-row'>
                {/* Admin menu  */}
                <table className='w-full md:w-4/5 mx-auto '>
                    <thead className='bg-yellow-400'>
                        <tr>
                            <th className='px-4 py-2 text-left'>ID</th>
                            <th className='px-4 py-2 text-left'>Name</th>
                            <th className='px-4 py-2 text-left'>Email</th>
                            <th className='px-4 py-2 text-left'>Admin</th>
                            <th className='px-4 py-2 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map(user=>(
                            <tr key={user._id}>
                                <td className='border px-4 py-2'>{user._id}</td>
                                <td className='border px-4 py-2'>
                                    {editableUserId === user._id ? (
                                        <div className='flex items-center'>
                                            <input type="text" value={editableUsername} onChange={(e)=> setEditableUsername(e.target.value)}
                                             className='w-full p-2 border rounded-md' />
                                             <button onClick={()=> updateHandler(user._id)} className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg'>
                                                <Check className='w-5 h-5' />
                                             </button>
                                        </div>
                                    ) : (
                                        <div className='flex items-center'>
                                            {user.username} {' '}
                                            <button onClick={() => toggleEdit(user._id,user.username,user.email)}>
                                                <Edit className='w-5 h-5 ml-[1rem]'/>
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className='px-4 py-2'>
                                    {editableUserId === user._id ? (
                                        <div className='flex items-center'>
                                            <input type="text" value={editableUserEmail} onChange={(e)=> setEditableUserEmail(e.target.value)}
                                             className='w-full p-2 border rounded-lg' />
                                             <button onClick={()=> updateHandler(user._id)}
                                             className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg'>
                                                <Check className='w-5 h-5' />
                                             </button>
                                        </div>
                                    ) : ( 
                                        <div className='flex items-center'>
                                            <p>{user.email}</p>
                                            <button>
                                                <Edit className='w-5 h-5 ml-[1rem]' />
                                            </button>
                                        </div>
                                    )}

                                </td>
                                <td className='px-4 py-2'>
                                    {user.isAdmin ? (
                                        <Check className='w-5 h-5 text-green-400' />
                                    ) : (
                                        <X className='w-5 h-5 text-red-400' />
                                    )}
                                </td>
                                <td className='px-4 py-2'>
                                    {!user.isAdmin && (
                                        <div className='flex'>
                                            <button onClick={()=> deleteHandler(user._id)}
                                                className='bg-red-500 text-white px-2 py-1 rounded-lg'>
                                                    <Trash2 className='w-4 h-4' />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  );
};

export default UserList