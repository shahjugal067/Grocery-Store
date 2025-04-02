import React from "react";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productSlice";
import AdminMenu from "./AdminMenu";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader className="w-5 h-5 text-yellow-500" />;
  }
  if (isError) {
    return <div>Error Loading Products</div>;
  }

  return (
    <div className="container px-64 w-full bg-green-200">
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="p-3">
          <div className=" text-xl h-12 text-center justify-center">
            All Products ({products.length})
          </div>
          <div className="flex flex-col">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`product/update/${product._id}`}
                className="block mb-4 overflow-hidden"
              >
                <div className="flex ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[6rem] h-[6rem] object-cover"
                  />
                  <div className="p-4 ml-10 flex flex-col">
                    <div className="flex justify-between">
                      <h4 className="text-xl mb-2">
                        {product?.name.toUpperCase()}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {moment(product.createdAt).format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <p className="text-gray-500 xl:w-[30rem] md:w-[20rem] sm:w-[15rem]  mb-4 text-sm">
                      {product?.description?.substring(0, 160)}...
                    </p>
                    <div className="flex justify-between">
                      <Link
                        to={`product/update/${product._id}`}
                        className="text-sm text-yellow-500 rounded-lg px-8 py-2 text-center bg-green-700 hover:bg-green-600"
                      >
                        Update
                      </Link>
                      <p>${product?.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
