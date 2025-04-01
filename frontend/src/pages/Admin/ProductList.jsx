import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation, useUpdateProductMutation } from '../../redux/api/productSlice'
import { toast } from 'react-toastify'
import { useFetchCategoriesQuery } from '../../redux/api/categorySlice'

const ProductList = () => {

  const [image,setImage] = useState('')

  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [description,setDescription] = useState('')
  const [category,setCategory] = useState('')
  const [quantity,setQuantity] = useState('')
  const [brand,setBrand] = useState('')
  const [stock,setStock] = useState('')
  const [imageUrl,setImageUrl] = useState(null)

  const navigate = useNavigate()
  
  const [uploadProductImage] = useUpdateProductMutation()
  const [createProduct] = useCreateProductMutation()
  const {data: categories } = useFetchCategoriesQuery()


  return (
    <div className='container xl:mx-[9rem] sm:mx-[0] '>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-3/4 p-3'>
            <div className='h-12'>Create Product </div>

            {imageUrl && (
              <div className='text-center'>
                <img src={imageUrl} alt="product" className='block mx-auto max-h-[200px]' />
              </div>
            )}
            <div className='mb-3'>
              <label className='border px-4 block w-full text-center rounded-lg cursor-pointer py-11'>
                {image ? image.name : 'Upload Image'}
                <input type="file" name='image' accept='image/*' onChange={(e) => setImage(e.target.files[0])} className={!image ? 'hidden' :'text-red-500'} />
              </label>
            </div>
            <div className='p-3 '>
              <div className='flex flex-wrap '>
                <div className='one'>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input type="text" className='p-1 rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={name} onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className='two '>
                  <label htmlFor="name block">Price</label>
                  <br />
                  <input type="number" className='p-1 ml-6 rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={price} onChange={(e)=> setPrice(e.target.value)} />
                </div>
            </div>
            <div className='flex flex-wrap'>
                <div className='one'>
                  <label htmlFor="name block">Quantity</label>
                  <br />
                  <input type="number" className='p-1 rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                </div>
                <div className='two '>
                  <label htmlFor="name block">Brand</label>
                  <br />
                  <input type="text" className='p-1 ml-6 rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={brand} onChange={(e)=> setBrand(e.target.value)} />
                </div>
            </div>
            <label htmlFor="" className='my-5 flex'>Description</label>
              <textarea type='text' className='p-2 mb-3 bg-[#1010101] border border-green-400 rounded-lg
               outline-none w-[90%]'></textarea>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default ProductList 