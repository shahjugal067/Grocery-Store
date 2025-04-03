import { Star, StarHalf } from 'lucide-react'
import { FaStar ,FaRegStar} from "react-icons/fa";

import React from 'react'
import { Link } from 'react-router-dom'

const Ratings = ({value, text, color}) => {
    const fullStar = Math.floor(value)
    const halfStar = value - fullStar > 0.5 ? 1 : 0
    const emptyStar = 5 - fullStar - halfStar
  return (
    <div className='flex items-center'>
        {[...Array(fullStar)].map((_,index)=>(
            <FaStar key={index} className={`text-yellow-500 ml-1`} />
        ))}
        {halfStar === 1 && <StarHalf className={`text-yellow-500 ml-1`} />}
        {[...Array(emptyStar)].map((_,index)=>(
          <FaRegStar key={index} className={`text-${color} ml-1`} />
        ))}
        <span className={`tating-text ml-2 text-${color}`}>{text && text}</span>
    </div>
  )
};
Ratings.defaultProps ={
  color:'yellow-500',
}

export default Ratings