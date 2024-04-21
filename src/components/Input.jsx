import React, { forwardRef } from 'react'

function Input({
    label = "",
    type = "text",
    className = "",
    ...props
}, ref) {

    return (
        <div>
            {label && <label className=''>
        {label}</label>}
        <input 
        type={type}
        className={`text-black ${className}`}
        {...props}
        ref={ref}
        />
        </div>
    )
}

export default forwardRef(Input)