import { Link,useParams } from "react-router-dom"
import { useGetProductsQuery } from "../redux/api/productSlice"
import Header from "../components/Header"
import { Loader } from "lucide-react"
import Message from "../components/Message"
import Product from "./Products/Product"

const Home = () => {

    const { keyword } = useParams()
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });
    
  return (
    <div className='border border-red-400'>
        {!keyword ? <Header/> : null }

        {isLoading ? (<Loader/>) : isError ? (<Message variant={'danger'}>
            {isError?.data?.message || isError.message}
        </Message>
        ) : (
          <>
          <div className="flex justify-between items-center mt-10 mb-6">
            <h1 className="ml-[20rem] text-3xl ">
              Special Products
            </h1>
            <Link to='/shop' className="bg-pink-500 rounded-full py-2 px-10 mr-[18rem] ml-[10rem] ">
            Shop Now
            </Link>
              </div>
              <div>
            <div className="flex justify-center flex-wrap mt-2">
              {data.products.map((product)=>(
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
          </>
        )}
    </div>
  )
}

export default Home