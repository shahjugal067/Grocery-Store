import { Loader } from "lucide-react"
import { useGetTopProductsQuery } from "../redux/api/productSlice"
import SmallProduct from "../pages/Products/SmallProduct"
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery()

    if(isLoading){
        return <Loader  className="w-5 h-5 text-yellow-500" />
    }
  return (
    
      <div className="flex">
        <div className="xl:block lg:hidden md:hidden sm:hidden px-4">
            <div className="grid grid-cols-2 justify-between items-center">
                { data.map((product)=>(
                    <div key={product._id}>
                        <SmallProduct product={product} />
                    </div>
                ))}
            </div>
        </div>
        <ProductCarousel/>
      </div> 
  )
};

export default Header