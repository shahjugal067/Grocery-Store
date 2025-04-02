import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useUpdateProductMutation ,useDeleteProductMutation,useGetProductByIdQuery,
    useUploadProductImageMutation } from '../../redux/api/productSlice'
import { toast } from 'react-toastify'
import { useFetchCategoriesQuery } from '../../redux/api/categorySlice'
import AdminMenu from './AdminMenu'
const ProductUpdate = () => {
    const navigate = useNavigate()
    const params = useParams()
    
    const {data: productData} = useGetProductByIdQuery(params._id)

    const [image,setImage] = useState(productData?.image || '');
    const [name,setName] = useState(productData?.name || '');
    const [description,setDescription] = useState(productData?.description || '');
    const [price,setPrice ] = useState(productData?.price || '');
    const [category ,setCategory ] = useState(productData?.category || '');
    const [quantity,setQuantity] = useState(productData?.quantity || '');
    const [brand,setBrand] = useState(productData?.brand || '');
    const [stock,setStock] = useState(productData?.stock || '');

    const {  categories } = useFetchCategoriesQuery()
    const [ uploadProductImage ] = useUploadProductImageMutation()
    const [updateProduct ] = useUpdateProductMutation()
    const [deleteProduct ] = useDeleteProductMutation()

    useEffect(()=>{
      if( productData && productData._id){
        setName(productData.name);
        setPrice(productData.price);
        setDescription(productData.description);
        setCategory(productData.categories?._id);
        setQuantity(productData.quantity);
        setBrand(productData.brand);
        setImage(productData.image);
      }
    },[productData]);

    const uploadFileHandler = async(e) =>{
      const formData = new FormData()
      formData.append('image',e.target.files[0]);

      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success("Item added successfully")
        setImage(res.image);

      } catch (error) {
        console.log(error)
        toast.error("Item upload failed")
      }
    };
    const handleUpdate = async(e)=>{
      e.preventDefault()
      try {
        const formData =  new FormData()

        formData.append('image',image)
        formData.append('name',name)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('category',category)
        formData.append('quantity',quantity)
        formData.append('brand',brand)
        formData.append('countInStock',stock)
        
        const { data } = await updateProduct({productId: params._id,formData});
        if(data.error){
          toast.error(data.error);
        }else{
          toast.success(`${data.name} updated successfully`);
          navigate('/allproducts');
        }
      } catch (error) {
        console.log(error)
        toast.error("Product update failed")
      }
    };
    const handleDelete = async()=>{
      try {
        let answer  = window.confirm('Are you sure you want to delete this product?')
        if(!answer)
          return;
        const { data } = await deleteProduct(params._id)
        
          toast.success(`${data.name} deleted successfully`)
          navigate('/allproducts')
        
      } catch (error) {
        console.log(error)
        toast.error("Delete Product  failed ")
      }
    };

  return (
    <div className='container xl:mx-auto bg-amber-100'>
    <div className='flex flex-col md:flex-row  items-center justify-center'>

      <AdminMenu />
      <div className='md:w-3/4 p-3'>
          <div className='h-16 text-2xl text-center text-green-700'>Create Product </div>

          { image && (
            <div className='text-center '>
              <img src={image} alt="product" className='block mx-auto max-h-[200px]' />
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
               <div className='ml-6'>
                <label htmlFor="name block">Category</label>
                <select name="category" id="category" value={category}
                onChange={(e)=> setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
               </div>
             </div>
             <button onClick={handleUpdate}
             className='bg-green-500 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg cursor-pointer'>
                Update
              </button>
              <button onClick={handleDelete}
             className='bg-red-500 ml-10 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg cursor-pointer'>
                Delete
              </button>
              
          </div>
          
      </div>
    </div>
  </div>
  )
}

export default ProductUpdate