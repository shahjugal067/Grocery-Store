import { Link,useParams } from "react-router-dom"
import { useGetProductsQuery } from "./redux/api/productSlice"
import Header from "./components/Header"

const Home = () => {

    const { keyword } = useParams()
    const { data, isLoading, isError } = useGetProductsQuery({ keyword });
    
  return (
    <div className='border border-red-400'>
        {!keyword ? <Header/> : null }
    </div>
  )
}

export default Home