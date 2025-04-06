import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress,savePaymentMethod } from '../../redux/features/cart/cartSlice'
import ProgressSteps from '../../components/ProgressSteps'

const Shipping = () => {

    const cart = useSelector((state)=> state.cart)
    const { shippingAddress} = cart
    const [paymentMethod, setPaymentMethod] = useState('Stripe');
    const [ address,setAddress ] = useState(shippingAddress.address || '')
    const [ city,setCity ] = useState(shippingAddress.city || '')
    const [ postalCode,setPostalCode ] = useState(shippingAddress.postalCode || '')
    const [ country,setCountry ] = useState(shippingAddress.country || '')

    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // payment method
    useEffect(()=>{
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    },[navigate,shippingAddress]);

    const submitHandler = (e)=>{
      e.preventDefault()

      dispatch(saveShippingAddress({address,city,postalCode,country}))
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
    }

  return (
    <div className='container mx-auto mt-10'>
       {/* progress steps  */}
       <ProgressSteps step1={true} step2={true} step3={false} />
       <div className='mt-[10rem] flex justify-around items-center flex-wrap'>
            <form onSubmit={submitHandler} className='w-[40rem]'>
                <h1 className='text-3xl mb-4'>Shipping</h1>
                <div className='mb-4'>
                    <label className='block mb-2'>Address</label>
                    <input type="text" className='w-full p-2 border border-gray-300' value={address} 
                    onChange={(e) => setAddress(e.target.value)} placeholder='Enter your address' required />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>City</label>
                    <input type="text" className='w-full p-2 border border-gray-300' value={city} 
                    onChange={(e) => setCity(e.target.value)} placeholder='Enter City name' required />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Postal Code</label>
                    <input type="text" className='w-full p-2 border border-gray-300' value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)} placeholder='Enter postal code' required />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Country</label>
                    <input type="text" className='w-full p-2 border border-gray-300' value={country} 
                    onChange={(e) => setCountry(e.target.value)} placeholder='Enter country' required />
                </div>
                <div className='mb-4'>
                   <label  className='block text-gray-500'>Select Method</label>
                   <div className='mb-2'>
                      <label className='inline-flex items-center'>
                        <input type="radio" className=' form-radio text-green-500'
                        name='paymentMethod' value='Stripe' checked={paymentMethod === 'Stripe'}
                        onChange={(e)=> setPaymentMethod(e.target.value)} />
                        <span className='ml-2'>Stripe or Credit Card</span>
                      </label>
                   </div>
                </div>
                <button className='bg-pink-500 hover:bg-pink-700 py-2 px-4 rounded-lg text-lg w-full'>
                  Continue
                </button>
            </form>
       </div>
    </div>
  )
}

export default Shipping