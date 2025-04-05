import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const SmallProduct = ({ product }) => {
  return (
    <div className='w-[26rem] p-4 px-20'>
        <div className='relative border border-amber-600 rounded-lg shadow-lg bg-gray-100'>
            <img src={product.image} alt={product.name} className='h-40 w-full rounded-lg object-cover'/>
                <HeartIcon product={product} />
            <div className=''>
                <Link to={`/product/${product._id}`} className='font-bold'>
                    <h2 className='flex justify-between items-center px-6 py-2 '>
                        <div> {product.name}  </div>
                        <span className='ml-2 bg-pink-300 rounded-lg px-2 hover:bg-pink-400 text-green-700'>
                            NPR{' '}{product.price}
                        </span>
                    </h2>
                </Link>

            </div>
        </div>
    </div>
  )
}

export default SmallProduct