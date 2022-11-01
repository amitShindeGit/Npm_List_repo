import React from 'react'

const Button = ({submitHandler, text}) => {
  return (
    <button onClick={submitHandler} className="bg-[#6558F5] py-1 px-2.5 rounded-sm text-sm text-white w-fit ">
        {text}
    </button>
  )
}

export default Button