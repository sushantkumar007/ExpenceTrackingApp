import React, { forwardRef } from 'react'

function Select({
    options = [],
    className = ""
}, ref) {
    return (
        <select className={`${className}`} ref={ref}>
        {options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
    )
}

export default forwardRef(Select)