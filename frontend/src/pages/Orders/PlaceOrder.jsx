import { useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import Message from '../../components/Message'
import ProgressSteps from "../../components/ProgressSteps"
import { useCreateOrderMutation } from '../../redux/api/orderSlice'
import { clearCartItems } from "../../redux/features/cart/cartSlice"
import { Loader } from "lucide-react"

const PlaceOrder = () => {
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const [createOrder, {isLoading,error } ] = useCreateOrderMutation()

    useEffect(()=>{
        if(!cart.shippingAddress){
            navigate('/shipping')
        }
    },[cart.paymentMethod, cart.shippingAddress, navigate]);

    const dispatch = useDispatch()

    const placeOrderHandler = async () =>{
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <ProgressSteps step1 step2 step3/>
        <div className="container mx-auto mt-8 px-10">
            {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <td className="px-2 py-2 text-left align-top">Image</td>
                                <td className="px-2 py-2 text-left ">Product</td>
                                <td className="px-2 py-2 text-left ">Quantity</td>
                                <td className="px-2 py-2 text-left ">Price</td>
                                <td className="px-2 py-2 text-left ">Total</td>

                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map((item,index)=>(
                                <tr key={index}>
                                    <td className="p-2">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="p-2">
                                        <Link to={`/product/${item.product}`}>
                                        {item.name}
                                        </Link>
                                    </td>
                                    <td >{item.qty}</td>
                                    <td >{item.price.toFixed(2)}</td>
                                    <td >$ {(item.price * item.qty).toFixed(2)}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-8">
                                <h2 className="text-2xl mb-5">Order Summary</h2>
                                <div className="flex justify-between flex-wrap p-8 bg-amber-100">
                                    <ul className="text-lg"> 
                                        <li>
                                            <span className="mb-4 mr-2">Items:</span>
                                            {cart.itemsPrice}
                                        </li>
                                        <li>
                                            <span className="mb-4 mr-2">Shipping:</span>
                                            {cart.shippingPrice}
                                        </li>
                                        <li>
                                            <span className="mb-4 mr-2">Tax:</span>
                                            {cart.taxPrice}
                                        </li>
                                        <li>
                                            <span className="mb-4 mr-2">Total:</span>
                                            {cart.totalPrice}
                                        </li>
                                    </ul>
                                    { error && <Message variant="danger">{error?.data?.message || error.error}</Message>}

                                    <div>
                                        <h2 className="text-2xl mb-4">Shipping</h2>
                                        <p>
                                            <strong>Address:</strong>{" "}
                                            {cart.shippingAddress.address} ,{ cart.shippingAddress.city}{" "}
                                            {cart.shippingAddress.postalCode},{" "}
                                            {cart.shippingAddress.country}
                                        </p>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl mb-4">Payment Method</h2>
                                        <strong>Method:</strong>{" "}{cart.paymentMethod}
                                    </div>
                                </div>
                                <button type="button" className="bg-green-500 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg"
                                disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                    Place Order
                                </button>
                                {isLoading && <Loader className="text-yellow-400 animate-spin"/>}
                            </div>
        </div>
    </div>
  )
}

export default PlaceOrder