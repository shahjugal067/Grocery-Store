import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetTopProductsQuery } from '../../redux/api/productSlice'
import { Loader } from 'lucide-react'
import Ratings from './Ratings'
import SmallProduct from './SmallProduct'

const ProductTabs = ({loadingProductReview, userInfo, submitHandler, rating,
     setRating, comment, setComment, product }) => {

        const {data, isLoading } = useGetTopProductsQuery()
        const [activeTab, setActiveTab] = useState(1)
        if(isLoading){
            return <Loader className='w-5 h-5 text-yellow-500'/>
        }

        const handleTabClick = (tabNum)=>{
            setActiveTab(tabNum)
        };

  return (
    <div className='flex flex-col md:flex-row'>
        <section  className='mr-10'>
            <div  className={` flex-1 cursor-pointer text-lg ${activeTab === 1 ? 'text-green-600':''}`}
            onClick={()=>handleTabClick(1)}>
                    Leave Your Review
            </div>
            <div  className={` flex-1 cursor-pointer text-lg ${activeTab === 2 ? 'text-green-600':''}`}
            onClick={()=>handleTabClick(2)}>
                    All Reviews
            </div>
            <div  className={` flex-1 cursor-pointer text-lg ${activeTab === 3 ? 'text-green-600':''}`}
            onClick={()=>handleTabClick(3)}>
                    Related Products 
            </div>
        </section>
        {/* second part  */}
        <section>
            {activeTab === 1 && (
                <div className='mt-4'>
                    {userInfo ? (
                        <form onSubmit={submitHandler} >
                            <div className='my-2 '>
                                <label htmlFor="rating" className='block text-lg'>Rating </label>
                                <select id="rating" required value={rating} 
                                onChange={(e)=>setRating(e.target.value)} 
                                className='p-2 border border-green-500 w-[30rem] outline-none rounded-lg text-black'>
                                    <option value="">Select</option>
                                    <option value="1">Inferior</option>
                                    <option value="2">Decent</option>
                                    <option value="3">Good</option>
                                    <option value="4">Excellent</option>
                                    <option value="5">Outstanding</option>
                                </select>
                            </div>
                            <div className='my-2'>
                                <label htmlFor="comment" className='block text-xl mb-2'>Comment</label>
                                <textarea id="comment" rows={'3'} required value={comment}
                                onChange={(e)=> setComment(e.target.value)}
                                className='p-2 border border-green-500 w-[30rem] outline-none rounded-lg text-black'>

                                </textarea>
                            </div>
                            <button type='submit' disabled={loadingProductReview}
                            className='bg-pink-500 hover:bg-pink-800 text-white py-2 px-4 rounded-lg'>
                                Submit
                            </button>
                        </form>
                    ) : (
                        <p>
                            Please <Link to="/login">Log In</Link> to write a review
                        </p>
                    )}
                </div>
            )}
        </section>

        <section>
           {activeTab ===2 && (
            <>
            <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
            <div>
                {product.reviews.map((review)=>(
                    <div key={review._id} className='bg-[#1a1a1a] p-4 rounded-lg xl:ml-4
                     sm:ml-0 xl:w-[50rem] sm:w-[30rem] mb-5'>
                        <div className='flex justify-between'>
                            <strong className='text-gray-300'>{review.name}</strong>
                            <span className='text-gray-300'>{review.createdAt.substring(0,10)}</span>
                        </div>
                        <p className='text-gray-300 my-3'>{review.comment}</p>
                        <Ratings value={review.rating} />
                    </div>
                ))}
            </div>
            </>
           )}
        </section>
        <section>
            {activeTab === 3 && (
                <section className='ml-8 flex flex-wrap'>
                    {!data ? (
                        <Loader className='w-5 h-5 text-yellow-500'/>
                    ) : (
                        data.map((product)=>(
                            <div key={product._id}>
                                <SmallProduct product={product}  />
                            </div>
                        ))
                    )}
                </section>
            )}
        </section>
    </div>
  )
}

export default ProductTabs