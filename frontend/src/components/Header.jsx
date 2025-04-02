import { useGetTopProductsQuery } from "../redux/api/productSlice"

const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery()
  return (
    <div>
       header
    </div>
  )
}

export default Header