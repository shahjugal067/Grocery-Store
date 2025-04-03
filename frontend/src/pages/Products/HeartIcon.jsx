import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesFromLocalStorage,addToFavoriteToLocalStorage,removeFavoriteFromLocalStorage } from '../../utils/localStorage'
import { setFavorites, removeFromFavorites, addToFavorites } from '../../redux/features/favorites/favoriteSlice'
import { Heart } from 'lucide-react'


const HeartIcon = ({product}) => {
  const dispatch = useDispatch()
  const favorites = useSelector(state=> state.favorites) || []
  const isFavorite = favorites.some((p) => p._id === product._id)

  useEffect(()=>{
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));

  },[]);

  const toggleFavorites = () =>{
    if(isFavorite){
      dispatch(removeFromFavorites(product))
      removeFavoriteFromLocalStorage(product._id)

    }else{
      dispatch(addToFavorites(product))
      addToFavoriteToLocalStorage(product)
    }
  }
  return (
    <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer'>
        {isFavorite ? (
          <Heart  className='w-4 h-4 text-pink-500'/>
        ) : (
          <Heart className='w-4 h-4'/>
        )}
    </div>
  )
}

export default HeartIcon