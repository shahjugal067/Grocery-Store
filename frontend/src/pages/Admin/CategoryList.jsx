import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation } from '../../redux/api/categorySlice'
import CategoryForm from '../../components/CategoryForm'
import Model from '../../components/Model'
const CategoryList = () => {
  
  const { data: categories } = useFetchCategoriesQuery()
  const [ name, setName ] = useState('')
  const [ selectedCategory, setSelectedCategory ] = useState('')
  const [ updateName, setUpdateName ] = useState('')
  const [ modelVisible ,setModelVisible ] = useState(false)

  const [ createCategory ] = useCreateCategoryMutation()
  const [ updateCategory ] = useUpdateCategoryMutation()
  const [ deleteCategory ] = useDeleteCategoryMutation()

  const handleCreateCategory = async(e)=>{
    e.preventDefault();
    if(!name){
      toast.error("Category name is required")
      return
    }
    try {
      const result = await createCategory({ name }).unwrap()
      if(result.error){
          toast.error(result.error)
      }else{
        setName('')
        toast.success(`${result.name} created successfully`)
      }
    } catch (error) {
      console.log(error)
      toast.error("Creating category failed")
    }
  };

  const handleUpdateCategory = async(e)=>{
    e.preventDefault();
    if(!updateName){
      toast.error("Category name is required")
      return;
    }
    try {
      const result = await updateCategory({categoryId: selectedCategory._id, updateCategory:{name:updateName}}).unwrap()
      if(result.error){
        toast.error(result.error)
      }else{
        toast.success(`${result.name} updated successfully`)
        setSelectedCategory(null);
        setUpdateName('')
        setModelVisible(false)
      }
    } catch (error) {
      console.log(error)
    }
  };
  const handleDeleteCategory = async()=>{
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap()

      if(result.error){
        toast.error(result.error)
      }else{
        toast.success(`${result.name} deleted successfully`)
        setSelectedCategory(null)
        selectedCategory(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Deleting category failed")
    }
  }
  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className='md:w-3/4 p-3'>
           <div className='h-12'>
            Manage Categories
           </div>
           <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />

           <br />
            <hr />

            <div className='flex flex-wrap'>
              {categories?.map((category)=>(
                <div key={category._id}>
                  <button className='bg-yellow-100 border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3
                  hover:bg-pink-500 hover:text-white outline-none focus:ring-2 focus:ring-pink-500 '
                  onClick={()=>{{
                    setModelVisible(true);
                    setSelectedCategory(category);
                    setUpdateName(category.name);
                  }}}>
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
            <Model isOpen={modelVisible} onClose={()=> setModelVisible(false)}>
              <CategoryForm value={updateName} setValue={(value)=>setUpdateName(value)} 
                handleSubmit={handleUpdateCategory} buttonText='Update' handleDelete={handleDeleteCategory} />
            </Model>
      </div>
    </div>
  )
}

export default CategoryList