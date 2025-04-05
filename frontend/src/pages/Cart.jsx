import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { addToCart,removeFromCart } from '../redux/features/cart/cartSlice'
import { Trash2 } from 'lucide-react'


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cart = useSelector(state => state.cart);
    const { cartItems} = cart;

    const addToCartHandler = (product,qty) =>{
        dispatch(addToCart({...product,qty}));
    };

    const removeFromCartHandler = (id)=>{
        dispatch(removeFromCart(id))
    };
    const checkoutHandler = () =>{
        navigate('/login?redirect=/shipping')
    }

  return (
    <div>
        <div className='container flex  items-center justify-center flex-wrap mx-auto w-[50rem]  rounded-lg'>
            {cartItems.length === 0 ? (
                <div className='text-2xl text-red-600'>Your cart is empty <Link to='/shop'>
                    <span className='text-green-600 bg-amber-400 rounded-lg px-2 py-2 hover:bg-amber-600'>Shop Now </span></Link>
                </div>
            ) : (
                <>
                <div className='flex flex-col w-[80%]'>
                    <h1 className='text-4xl border-b-2 mb-4 text-center text-green-700'>
                        Shopping Cart
                    </h1>
                    {cartItems.map((item)=>(
                        <div key={item._id} className=' flex items-center border border-yellow-400 mb-2 p-2'>
                            <div className='w-[5rem] h-[5rem]'>
                                <img src={item.image} alt={item.name} className='w-full object-cover rounded-lg' />
                            </div>

                            <div className='flex-1 ml-4'>
                                <Link to={`/product/${item._id}`} className='font-bold text-yellow-700'>
                                {item.name}
                                </Link>
                                <div className=' mt-2 '>{item.brand}</div>
                                <div className='mt-2 text-green-600'>${item.price}</div>
                            </div>
                            <div className='w-24 '>
                                <select className='w-full p-1 border border-green-400 rounded-lg text-black outline-none'
                                 value={item.qty} onChange={(e)=>addToCartHandler(item,Number(e.target.value))}>
                                    {[...Array(item.countInStock).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                        ))}
                                 </select>
                            </div>
                            <div className=''>
                                    <button className='text-red-600' onClick={()=>removeFromCartHandler(item._id)} type='button'>
                                        <Trash2 className='w-5 h-5 items-center ml-2' />
                                    </button>
                            </div>
                        </div>
                    ))}
                    <div className='mt-8'>
                        <div  className='p-2 px-10 rounded-lg shadow-lg shadow-sky-500 bg-yellow-200'>
                            <h2 className='text-xl mb-2 '> 
                                Items ({cartItems.reduce((acc,item)=> acc + item.qty,0)})
                            </h2>
                            <div className='text-2xl text-green-600 '>
                            ${ cartItems.reduce((acc,item) => acc + item.price * item.qty,0).toFixed(2) }
                            </div>
                        </div>
                        <button disabled={cartItems.length === 0} onClick={checkoutHandler}
                         className='bg-emerald-700  hover:bg-emerald-500 mt-4 py-2 px-4 rounded-lg text-xl'>
                            Proceed to checkout
                        </button>
                    </div>
                </div>
                </>
            )}
        </div>
    </div>
  )
}

export default Cart