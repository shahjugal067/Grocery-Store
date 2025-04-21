
import { useDispatch} from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import HeartIcon from './HeartIcon'
import { ShoppingCart } from 'lucide-react'


const ProductCard = ({product}) => {
    

    const dispatch = useDispatch()

    const addToCartHandler = (product, qty) =>{
        
        dispatch(addToCart({...product, qty}));
        toast.success('Item added to cart');
        
    }

  return (
    <div className='max-w-sm relative rounded-lg shadow-lg dark:bg-gray-800 '>
        <section className='relative'>
            <Link to={`/product/${product._id}`}>
            <span className='absolute bottom-3 right-3 bg-pink-100 text-pink-800 mr-2
             px-2.5 py-0.5 rounded-lg text-xs font-medium'>
                {product?.brand}
            </span>
            <img src={product.image} alt={product.name}
             style={{height:'180px',width:'100%', objectFit:'cover'}}
             className='cursor-pointer' />
             
            </Link>
            <HeartIcon product={product} />
        </section>
        <div className='p-2'>
            <div className='flex justify-between items-center'>
                <h3 className='mb-2 text-xl text-yellow-500 '>
                    {product?.name}
                </h3>
                <p className='text-green-500 text-lg'>{product?.price?.toLocaleString('en-US',{
                    style:'currency',
                    currency:'NPR',
                })}
                
                </p>
            </div>
            <p className='mb-3 text-yellow-300'>
                    {product?.description?.substring(0,50)}...
            </p>
            <section className='flex justify-between items-center'>
                <Link to={`/product/${product._id}`} className='inline-flex items-center px-3 py-2 text-sm 
                 hover:bg-amber-600 hover:text-white rounded-lg text-center bg-amber-300'>
                Read More...
                </Link>
              
                <button className='p-2 rounded-lg text-yellow-300 hover:bg-amber-600 '
                onClick={()=> addToCartHandler(product,1)}>
                    <ShoppingCart className='h-5 w-5' />

                </button>
            </section>
        </div>
    </div>
  )
}

export default ProductCard