import React from 'react'
import { useState } from 'react'
import { AiFillHeart,AiOutlineHeart } from 'react-icons/ai'

const Heart = ({onClick}) => {
    const [isLiked, setIsLiked] = useState(false)

    const handleLike = ((click) => {
        setIsLiked(!isLiked)
        onClick()
    })
  return (
    <div className='container-fluid'>
    {isLiked ? <AiFillHeart color="red" onClick={handleLike}/> :  <AiOutlineHeart color="red" onClick={handleLike}/>}
    </div>
  )
}

export default Heart