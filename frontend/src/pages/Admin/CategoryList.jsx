import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation } from '../../redux/api/categorySlice'
const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery()
  const [ name, setName ] = useState('')
  const [ selectedCategory, setSelectedCategory ] = useState('')
  const [ updateName, setUpdateName ] = useState('')
  const [ modelVisible ,setModelVisible ] = useState(false)

  const [ createCategory ] = useCreateCategoryMutation()
  const [ updateCategory ] = useUpdateCategoryMutation()
  const [ deleteCategory ] = useDeleteCategoryMutation()


  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className='md:w-3/4 p-3'>
           <div className='h-12'>
            Manage Categories
           </div>
      </div>
    </div>
  )
}

export default CategoryList