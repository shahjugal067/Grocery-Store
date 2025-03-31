import React from 'react'

const CategoryForm = ({ value, setValue, handleSubmit, buttonText='Submit',handleDelete,}) => {
  return (
    <div className='p-2'>
        <form onSubmit={handleSubmit} className='space-y-3'>
            <input type="text" className='py-2 px-4 border rounded-lg w-full'
            value={value} placeholder='Category name plz...' onChange={(e)=> setValue(e.target.value)} />
            <div className='flex justify-between'>
                <button className='bg-green-500 hover:bg-indigo-400 text-white py-2 px-4 rounded-lg'>
                    {buttonText}
                </button>
                {handleDelete && (
                    <button onClick={handleDelete}
                    className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 outline-none'>
                        Delete
                    </button>
                )}
            </div>
        </form>
    </div>
  )
}

export default CategoryForm