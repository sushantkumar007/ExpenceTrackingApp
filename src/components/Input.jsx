import React, { forwardRef } from 'react'

function Input({
    label = "",
    type = "text",
    className = "",
    ...props
}, ref) {

    return (
        <div>
            {label && <label className='w-full'>
        {label}</label>}<br />
        <input 
        type={type}
        className={`w-full text-black border border-black rounded ${className}`}
        {...props}
        ref={ref}
        />
        </div>
    )
}

export default forwardRef(Input)