import React, { useState } from 'react'
import {  Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen)
    }
  return (
    <>
      <button className={`${isMenuOpen ? 'top-2 right-2': 'top-5 right-7'}
        p-2  fixed rounded-lg`} onClick={toggleMenu}>
        { isMenuOpen ? (
            <X size={20} className='text-red-500' />
        ):(
            <>
            <Menu className='w-6 h-5 text-gray-600 bg-amber-400 rounded-lg' />
            </>
        )}
    </button>
    { isMenuOpen && (
        <section className='bg-emerald-500 rounded-lg p-1  fixed right-10 top-3'>
            <ul className='list-none mt-2'>
            <li>
                    <NavLink className='list-item py-1 px-2 rounded-lg text-gray-600 hover:bg-amber-200 mb-2'
                    to={'/dashboard'} style={({isActive})=> ({
                        color: isActive ? 'greenyellow' : 'block'
                    })}>
                        Admin Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-1 px-2 rounded-lg text-gray-600 hover:bg-amber-200 mb-2'
                    to={'/categorylist'} style={({isActive})=> ({
                        color: isActive ? 'greenyellow' : 'block'
                    })}>
                        Create Category
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-1 px-2 rounded-lg text-gray-600 hover:bg-amber-200 mb-2'
                    to={'/productlist'} style={({isActive})=> ({
                        color: isActive ? 'greenyellow' : 'block'
                    })}>
                        Create Product
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-1 px-2 rounded-lg text-gray-600 hover:bg-amber-200 mb-2'
                    to={'/allproducts'} style={({isActive})=> ({
                        color: isActive ? 'greenyellow' : 'block'
                    })}>
                        All Product
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-1 px-2 rounded-lg text-gray-600 hover:bg-amber-200 mb-2'
                    to={'/userlist'} style={({isActive})=> ({
                        color: isActive ? 'greenyellow' : 'block'
                    })}>
                        Manage Users
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-1 px-2 rounded-lg text-gray-600 hover:bg-amber-200 mb-2'
                    to={'/orderlist'} style={({isActive})=> ({
                        color: isActive ? 'greenyellow' : 'block'
                    })}>
                        Manage Orders
                    </NavLink>
                </li>
            </ul>

        </section>
    )}  
    </>
  )
}

export default AdminMenu