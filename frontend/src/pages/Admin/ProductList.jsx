import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/api/productSlice'
import { toast } from 'react-toastify'
import { useFetchCategoriesQuery } from '../../redux/api/categorySlice'
import AdminMenu from './AdminMenu'

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
  
  const [uploadProductImage] = useUploadProductImageMutation()
  const [createProduct] = useCreateProductMutation()
  const {data: categories } = useFetchCategoriesQuery()


  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append('image',image)
      productData.append('name',name)
      productData.append('description',description)
      productData.append('price',price)
      productData.append('category',category)
      productData.append('quantity',quantity)
      productData.append('brand',brand)
      productData.append('countInStock',stock)

      const { data } = await createProduct(productData)

      if(data.error){
        toast.error("Product create failed")
      }else{
        toast.success(`${data.name} created successfully`)
        navigate('/');
      }
    } catch (error) {
      console.log(error)
      toast.error("Product creation failed ")
    }
  };
  const uploadFileHandler = async(e) =>{
    const formData = new FormData()
    formData.append('image', e.target.files[0]);
   
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image)
      setImageUrl(res.imageUrl)
      console.log(res)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || error.error)
    }
  };

  return (
    <div className='container xl:mx-auto bg-amber-100'>
      <div className='flex flex-col md:flex-row  items-center justify-center'>

        <AdminMenu />
        <div className='md:w-3/4 p-3'>
            <div className='h-16 text-2xl text-center text-green-700'>Create Product </div>

            { imageUrl && (
              <div className='text-center '>
                <img src={imageUrl} alt="product" className='block mx-auto max-h-[200px]' />
              </div>
            )}
            <div className='mb-3'>
              <label className='border px-4 block w-full text-center rounded-lg cursor-pointer py-11'>
                
                { image ? image.name : 'Upload Image'}

                <input type="file" name='image' accept='image/*'
                 onChange={uploadFileHandler} 
                 className={!image ? 'hidden' :'text-red-500'} />
              </label>
            </div>
            <div className='p-3 '>
              <div className='flex flex-wrap  '>
                <div className='one'>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input type="text" className='p-1 rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={name} onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className='two ml-6'>
                  <label htmlFor="name block">Price</label>
                  <br />
                  <input type="number" className='p-1  rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={price} onChange={(e)=> setPrice(e.target.value)} />
                </div>
            </div>
            <div className='flex flex-wrap '>
                <div className='one'>
                  <label htmlFor="name block">Quantity</label>
                  <br />
                  <input type="number" className='p-1 rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                </div>
                <div className='two  ml-6 '>
                  <label htmlFor="name block">Brand</label>
                  <br />
                  <input type="text" className='p-1 rounded-lg mb-3 w-[20rem] border border-green-400 outline-none'
                   value={brand} onChange={(e)=> setBrand(e.target.value)} />
                </div>
            </div>
            <label htmlFor="" className='my-5 flex'>Description</label>
              <textarea type='text' className='p-2 mb-3 bg-[#1010101] border border-green-400 rounded-lg
               outline-none w-[90%]' onChange={(e)=> setDescription(e.target.value)} value={description}>

               </textarea>
               <div className='flex justify-between'>
                  <div>
                    <label htmlFor="name block">In Stock</label> <br />
                    <input type="text" className='p-2 mb-3 w-[20rem] rounded-lg outline-none border border-green-400'
                     value={stock} onChange={(e)=> setStock(e.target.value)} />
                  </div>
                  <div className='ml-6 '>
                    <label htmlFor="" className='flex'>Category</label>
                    <select aria-placeholder='Choose Category' onChange={(e)=> setCategory(e.target.value)}
                     value={category} className='p-2 mb-3 w-[20rem] rounded-lg outline-none border border-green-400'>

                      {categories?.map((c)=>(
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
               </div>
               <button onClick={handleSubmit}
               className='bg-green-500 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg cursor-pointer'>
                  Submit
                </button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default ProductList 