import React from 'react'
import { X } from 'lucide-react'

const Model = ({isOpen, onClose, children }) => {
  return (
    <div>
        {isOpen && (
            <div className='fixed inset-0 flex justify-center items-center z-50'>
                <div className='fixed inset-0 bg-black opacity-50'>
                    <div className='absolute top-[40%] right-[50%] bg-white p-2 z-10 text-right'>
                        <button  className='text-block hover:text-gray-700 outline-none mr-2'
                        onClick={onClose}>
                            <X className='w-6 h-6 text-red-600' />
                        </button>
                        {children}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Model