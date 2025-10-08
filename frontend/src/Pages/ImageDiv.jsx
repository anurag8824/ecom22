import React from 'react'

const ImageDiv = ({src}) => {
  return (
    <div className='my-2'>
        <img className="w-full" src={src} />
    </div>
  )
}

export default ImageDiv