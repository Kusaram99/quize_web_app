import React from 'react'

const SolvedNumberingBox = () => {

    const questionsNumber = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]


  return (
    <div className='flex flex-wrap gap-3'> 
        {
            questionsNumber.map((item, index)=>(
                <span className='flex justify-center items-center w-10 h-10 p-4 cursor-pointer bg-red-500 rounded text-white font-semibold'>{item}</span>
            ))
        }
    </div>
  )
}

export default SolvedNumberingBox