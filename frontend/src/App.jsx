import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navigation from './pages/Admin/Auth/Navigation'
import { Outlet } from 'react-router-dom'
const App = () => {

  return (
    <div className=''>
      <ToastContainer/>
      <Navigation/>
      <main className='py-3'>
        <Outlet />
      </main>
    </div>
  )
}

export default App