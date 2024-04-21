import React, { forwardRef } from 'react'

function Select({
    options = []
}, ref) {
    return (
        <select ref={ref}>
        {options.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
    )
}

export default forwardRef(Select)