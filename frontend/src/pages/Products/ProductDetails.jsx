import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productSlice";
import moment from "moment";
import { Boxes, Calendar1, ChevronLeft, Loader, ShoppingCart, Star, Store } from "lucide-react";
import Message from "../../components/Message";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await createReview({
          productId,
          rating,
          comment,
        }).unwrap();
        refetch();
        toast.success("Review submitted successfully");

      } catch (error) {
        console.log(error)
        toast.error(error?.data || error.error)
      }
    };
    const addToCartHandler = () =>{
      dispatch(addToCart({...product,qty}))
      navigate('/cart')
    }

  return (
    <>
      <div>
        <Link to="/" className=" text-white hover:underline ml-20 flex">
          <ChevronLeft className="w-6 h-6 text-green-700" />{" "}
          <span className="text-blue-800">Back</span>
        </Link>
      </div>
      {isLoading ? (
        <Loader className="w-5 h-5 text-yellow-500" />
       ) : error ? (
        <Message variant={'danger'} >
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
        <div className="flex flex-wrap relative justify-between mt-4 ml-32">
            <div className="">
                <img src={product.image} alt={product.name} className="w-full xl:w-[40rem] lg:w-[35rem] md:w-[20rem] sm:w-[20rem] " />
                <HeartIcon product={product} />
                
            </div>
            <div className="flex flex-col">
                <h2 className="text-2xl">{product.name}</h2>
                <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[25rem] text-gray-600">{product.description}</p>
                <p  className="text-2xl my-2">${product.price}</p>
                <div className="flex items-center justify-between w-[20rem]">
                    <div className="one">
                        <h1 className="flex items-center mb-2">
                            <Store className="w-4 h-4 mr-2 text-yellow-400" />
                            Brand:{' '} {product.brand}
                        </h1>
                        <h1 className="flex items-center mb-2">
                            <Calendar1 className="w-4 h-4 mr-2 text-yellow-400" />
                            Added:{' '} {moment(product.createdAt).fromNow()}
                        </h1>
                        <h1 className="flex items-center mb-2">
                            <Star className="w-4 h-4 mr-2 text-yellow-400" />
                            Reviews:{' '} {product.numReviews}
                        </h1>
                    </div>
                    <div>
                        <h1 className="flex items-center mb-2">
                            <Star className="w-4 h-4 mr-2 text-yellow-400" />
                            Rating:{' '} {product.rating}
                        </h1>
                        <h1 className="flex items-center mb-2">
                            <ShoppingCart className="w-4 h-4 mr-2 text-yellow-400" />
                            Quantity:{' '} {product.quantity}
                        </h1>
                        <h1 className="flex items-center mb-2">
                            <Boxes className="w-4 h-4 mr-2 text-yellow-400" />
                            In Stock:{' '} {product.countInStock}
                        </h1>
                    </div>
                </div>
                <div className="flex justify-between flex-wrap">
                    <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
                    {product.countInStock > 0 && (
                      <div>
                        <select value={qty} onChange={(e) => setQty(e.target.value)}
                          className="p-2 w-20 rounded-lg text-block outline-none border border-green-500">
                           {[...Array(product.countInStock).keys()].map((x)=>(
                            <option value={x+1} key={x+1}>
                              {x + 1}
                            </option>
                           ))}
                        </select>
                      </div>
                    )}
                </div>
                <div className="btn-container">
                <button 
                onClick={addToCartHandler} 
                disabled={product.countInStock === 0 }
                className="bg-pink-500 cursor-pointer hover:bg-indigo-400 text-white py-2 px-4 rounded-lg">
                    Add to Cart
                </button>
                </div>
            </div>
            <div className="mt-8 container flex flex-wrap items-start justify-between ml-20">
                  <ProductTabs submitHandler={submitHandler} loadingProductReview={loadingProductReview}
                  userInfo={userInfo} rating={rating} setRating={setRating}
                  comment={comment} setComment={setComment} product={product} />
            </div>
        </div>
        </>
        
      )}
    </>
  );
};

export default ProductDetails;
