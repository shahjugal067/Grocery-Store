import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import HeartIcon from './HeartIcon'


const ProductCard = ({product}) => {

    const dispatch = useDispatch()

  return (
    <div className='max-w-sm relative rounded-lg shadow-lg dark:bg-gray-800 '>
        <section className='relative'>
            <Link to={`/product/${product._id}`}>
            <span className='absolute bottom-3 right-3 bg-pink-100 text-pink-800 mr-2
             px-2.5 py-0.5 rounded-lg text-xs font-medium'>
                {product?.brand}
            </span>
            <img src={product.image} alt={product.name}
             style={{height:'180px', objectFit:'cover'}}
             className='cursor-pointer' />
             
            </Link>
            <HeartIcon product={product} />
        </section>
        <div className='p-2'>
            <div className='flex justify-between items-center'>
                <h3 className='mb-2 text-xl text-yellow-500 '>
                    {product?.name}
                </h3>
                <p>{product?.price?.toLocaleString('en-US',{
                    style:'currency',
                    currency:'NPR',
                })}
                
                </p>
            </div>
            <p className='mb-3 text-yellow-300'>
                    {product?.description?.substring(0,50)}...
            </p>
        </div>
    </div>
  )
}

export default ProductCard