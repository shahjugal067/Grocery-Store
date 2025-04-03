import React from 'react'
import { Link } from 'react-router-dom'

const SmallProduct = ({ product }) => {
  return (
    <div className='w-[25rem] p-4 px-20'>
        <div className='relative border border-amber-600 rounded-lg'>
            <img src={product.image} alt={product.name} className='h-60 rounded-lg object-cover'/>

            <div className=''>
                <Link to={`/product/${product._id}`} className='font-bold'>
                    <h2 className='flex justify-between items-center px-6 py-2 '>
                        <div> {product.name}  </div>
                        <span className='ml-2 bg-pink-300 rounded-lg px-2 hover:bg-pink-400 text-green-700'>${product.price}</span>
                    </h2>
                </Link>

            </div>
        </div>
    </div>
  )
}

export default SmallProduct