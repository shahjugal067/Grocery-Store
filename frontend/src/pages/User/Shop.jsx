import React, { useEffect, useState } from "react";
import { useGetFilteredProductsQuery } from "../../redux/api/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {Loader} from 'lucide-react'
import {
  setCategories,
  setProducts,
  setChecked,
} from "../../redux/features/shop/shopSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categorySlice";
import ProductCard from "../Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading)
      dispatch(setCategories(categoriesQuery.data || []));
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // filter products based on checked and radio
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, dispatch, filteredProductsQuery.data, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );

    dispatch(setProducts(productsByBrand));
  };
  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };
  // add all brands option to unique brands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // update the price filter state when the user types in the input field
    setPriceFilter(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex md:flex-row">
        <div className=" p-3 mt-2 mb-2 bg-green-200 rounded-lg shadow-md">
          <h2 className="text-lg py-2 px-2 text-center rounded-full mb-2 bg-amber-500">
            Filter By Categories
          </h2>

          <div className="p-5 w-[15rem]">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
                <div className=" flex items-center mr-4">
                  <input
                    type="checkbox"
                    id="red-checkbox"
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded"
                  />

                  <label htmlFor="pink-checkbox" className="ml-2 text-sm">
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-center py-2 bg-yellow-600 rounded-full mb-2">
            Filter By Brand
            </h2>
            <div className="p-5">
                {uniqueBrands?.map((brand)=>(
                    <>
                    <div className="flex items-center mr-4 mb-4">
                        <input type="radio" id={brand} name="brand"
                        onChange={()=> handleBrandClick(brand)} />
                       <label htmlFor="pink-radio" className="ml-2 text-sm">
                        {brand}
                       </label>
                    </div>
                    </>
                ))}
            </div>
            <h2 className="text-center py-2 bg-yellow-600 rounded-full mb-2">
            Filter By Price
            </h2>
            <div className="p-5 w-[15rem]">
                <input type="text" placeholder="Enter price .." value={priceFilter}
                 onChange={handlePriceChange} 
                 className="w-full px-3 py-1 outline-none border bg-yellow-300 rounded-lg"/>
            </div>
            <div className="p-5 pt-0">
                <button className="w-full border my-2" onClick={()=> window.location.reload()}
                    >
                    Reset
                </button>
            </div>
        </div>
        <div className="p-3">
                <h1 className="text-center mb-2">
                    {products?.length} Products Found
                </h1>
                <div className="flex flex-wrap">
                    {products.length === 0 ? (
                        <Loader className="mx-auto" />
                    ) : (
                        products?.map((product)=>(
                            <div key={product._id} className="p-3">
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
