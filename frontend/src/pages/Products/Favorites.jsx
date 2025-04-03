import React from 'react'
import { useSelector } from 'react-redux'
import { selectFavoriteProduct } from '../../redux/features/favorites/favoriteSlice'
import Product from './Product';

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className=' items-center justify-center ml-40 '>
        <h1 className='text-xl ml-6 mt-6'>Favorite Products</h1>
        <div className='flex flex-wrap'>
            { favorites.map((product)=>(
                <Product key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default Favorites