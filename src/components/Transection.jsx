import React, { useEffect, useState } from 'react'
import { databaseService } from '../appwrite'
import { useDispatch, useSelector } from 'react-redux'
import { addStatement } from '../store/statementSlice'

function Transection({$id, date, particular, amount, status }) {
    const [dateString, setDateString] = useState("")

    useEffect(() => {
        const d = new Date(date)
        setDateString(`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`)
    }, [])

    

    const statement = useSelector((state) => state.statement.transections)
    const dispatch = useDispatch()

    const deleteTransection = (transectionId) => {
        databaseService.deleteTransection(transectionId).then((status) => {
            if (status) {
                const transections = statement.filter((transection) => {
                    return transectionId !== transection.$id
                })
                dispatch(addStatement({transections}))
            }
        })
       
    }

    const editTransection = (transectionId) => {
        
    }

  return (
    <div className='w-[97%] lg:max-w-[900px] mx-auto mb-2 px-2 py-2 rounded flex justify-between bg-gray-700'>
        <div className='w-[69%] flex flex-1 justify-between text-white lg:text-lg'>
            <div>
                <span>{dateString}</span>
                <span className='ml-2 lg:ml-4'>{particular}</span>
            </div>
            <div>
                <span>{amount}</span>
                <span className='ml-2 mr-1'>{status}</span>
            </div>
        </div>
        <div>
            <button onClick={() => editTransection($id)} className='bg-green-500 px-2 py-0.5 rounded mx-1 lg:mx-4'>Edit</button>
            <button onClick={() => deleteTransection($id)} className='bg-red-500 px-2 py-0.5 rounded'>Delete</button>
        </div>
    </div>
  )
}

export default Transection