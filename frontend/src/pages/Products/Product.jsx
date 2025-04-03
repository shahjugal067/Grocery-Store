
import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({product}) => {
  return (
    <div className='w-[24rem] ml-[2rem] p-4'>
        <div className='relative'>
            <img src={product.image} alt={product.name} className='h-36 rounded-lg' />

            <HeartIcon product={product} />
        </div>
        <div className='p-4'>
            <Link to={`/product/${product._id}`} >
            <h2 className='flex justify-between items-center'>
                <div className='text-lg'>
                    {product.name}
                </div>
                <span className='bg-pink-500 text-green-700 text-sm px-2 py-0.5 rounded-full'>${product.price}</span>
            </h2>
            </Link>
        </div>
    </div>
  )
}

export default Product