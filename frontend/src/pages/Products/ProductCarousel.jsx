import React from "react";
import { useGetTopProductsQuery } from "../../redux/api/productSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Message from "../../components/Message";
import { BoxesIcon, Calendar1, ShoppingBasket, Star, Store } from "lucide-react";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    pauseOnDotsHover: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    
  };


  return (
    <div className="mb-4 xl:block lg:block md:block sm:block ">
        { isLoading ? null : error ? (
            <Message variant={'danger'}>
                {error?.data?.message || error.message}
            </Message>
        ) : (
            <Slider {...settings} 
            className="xl:w-[38rem] lg:w-[38rem] md:w[42rem] sm:w-[28rem] sm:block px-4">
                {products.map(({image, _id, name, price,quantity, description,brand,createdAt ,numReviews,rating,countInStock})=>(
                    <div key={_id}>
                        <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem]" />
                        <div className="flex justify-between  mt-4">
                            <div className="one">
                                <h2>{name}</h2>
                                <p>${price}</p> <br /> <br />
                                <p>{description.substring(0,120)}...</p>
                            </div>
                            <div className="flex justify-between ">
                                <div className="one">
                                    <h1 className="flex items-center mb-2">
                                        <Store className="w-5 h-5 mr-2  text-yellow-700"/>
                                        Brand:{brand}
                                    </h1>
                                    <h1 className="flex items-center mb-2">
                                        <Calendar1 className="w-5 h-5 mr-2 text-yellow-600"/>
                                        Added:{' '}{moment(createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-2">
                                        <Star className="w-5 h-5 mr-2 text-yellow-600"/>
                                        Reviews:{numReviews}
                                    </h1>
                                </div>
                                <div className="two">
                                    <div  className="flex items-center mb-2">
                                        <Star className="w-5 h-5 mr-2 text-yellow-600"/>
                                        Rating:{' '}{Math.round(rating)}
                                    </div>
                                    <div  className="flex items-center mb-2">
                                        <ShoppingBasket className="w-5 h-5 mr-2 text-yellow-600"/>
                                        Quantity:{' '}{quantity}
                                    </div>
                                    <div  className="flex items-center mb-2">
                                        <BoxesIcon className="w-5 h-5 mr-2 text-yellow-600"/>
                                        InStock:{' '}{countInStock}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        )}
    </div>
  )
  
};

export default ProductCarousel;
