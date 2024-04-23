import React, { useState, useEffect } from 'react'
import { databaseService } from '../appwrite/index'
import { useDispatch, useSelector } from 'react-redux'
import { addStatement, removeStatement } from "../store/statementSlice"

function Statement() {
    // const [statement, setStatement] = useState([])
    const userData = useSelector((state) => state.auth.userData)
    const statement = useSelector((state) => state.statement.transections)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (userData) {
            databaseService.getStatement(userData.$id)
            .then((statement) => {
                const transections = statement.documents;
                dispatch(addStatement({transections}))
                console.log(transections)
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            dispatch(removeStatement())
        }
    }, [userData])

   return (
    statement.length > 0 ? (
        <div className='w-[90vw] mx-auto my-8 px-2 py-2 rounded'>
            {statement.map((transection, index) => (
                <div key={index} className='flex justify-between'>
                    <div className='w-[77%] flex justify-between'>
                        <div>
                            <span>{transection.date}</span>
                            <span className='ml-2'>{transection.particular}</span>
                        </div>
                        <div>
                            <span>{transection.amount}</span>
                            <span className='ml-2'>{transection.status}</span>
                        </div>
                    </div>
                    <div>
                        <button className='bg-green-400'>Edit</button>
                        <button className='bg-red-400'>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    ) : <h1>please add post...</h1>)

}

export default Statement