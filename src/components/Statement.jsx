import React, { useState, useEffect } from 'react'
import { databaseService } from '../appwrite/index'
import { useDispatch, useSelector } from 'react-redux'
import { addStatement, removeStatement } from "../store/statementSlice"
import { Transection } from './index'

function Statement() {
    const userData = useSelector((state) => state.auth.userData)
    const statement = useSelector((state) => state.statement.transections)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (userData) {
            databaseService.getStatement(userData.$id)
            .then((statement) => {
                const transections = statement.documents;
                dispatch(addStatement({transections}))
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            dispatch(removeStatement())
        }
    }, [userData, statement])

    
   return (
    statement.length > 0 ? (
        <div className='w-full mx-auto my-8'>
            {statement.map((transection) => (
                <div key={transection.$id}>
                    <Transection {...transection} />
                </div>
            ))}
        </div>
    ) : <h1 className='text-center'>please add post...</h1>)

}

export default Statement