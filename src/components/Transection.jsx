import React, { useEffect, useState } from 'react'
import { databaseService } from '../appwrite'
import { useDispatch, useSelector } from 'react-redux'
import { addStatement } from '../store/statementSlice'
import { Input, Button } from './index'
import { useForm } from 'react-hook-form'

function Transection({$id, date, particular, amount, status }) {
    const [dateString, setDateString] = useState("")
    const [updatedStatus, setUpdatedStatus] = useState(status)
    const [isTransectionEditable, setIsTransectionEditable] = useState(false)
    const userData = useSelector((state) => state.auth.userData)
    const statement = useSelector((state) => state.statement.transections)
    const dispatch = useDispatch()
    const { register, handleSubmit} = useForm({
        defaultValues: {
            date: date,
            particular: particular,
            amount, amount
        }
    })
    
    useEffect(() => {
        const d = new Date(date)
        setDateString(`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`)
    }, [date])
    
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

    const editTransection = () => {
        setIsTransectionEditable((prev) => !prev)
    }

    const credit = () => {
        setUpdatedStatus("Cr")
    }

    const debit = () => {
        setUpdatedStatus("Dr")
    }

    const updateTransection = (data) => {
        data.status = updatedStatus
        databaseService.updateTransection({
            transectionId: $id, 
            ...data
        })
        .then((updatedTransection) => {
            if (updatedTransection) {
                databaseService.getStatement(userData.$id)
                .then((updatedStatement) => {
                    if (updatedStatement) {
                        const transections = updatedStatement.documents
                        dispatch(addStatement({transections}))
                    }
                })
            }
        })
        editTransection()
    }


  return !isTransectionEditable ? (
    <div className='w-[97%] lg:max-w-[900px] mx-auto mb-2 p-2 rounded flex justify-between bg-gray-700'>
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
  ) : (
    <div className='w-[97%] lg:max-w-[900px] mx-auto mb-2 p-2 rounded bg-gray-700 text-white'>
            <form onSubmit={handleSubmit(updateTransection)} className='w-[90%] mx-auto lg:w-[90%]'>
                <div className="lg:flex justify-between items-center">
                    <Input 
                        type="date"
                        label="Date"
                        placeholder="Enter the date"
                        className='my-2 px-2 mr-2'
                        {...register("date")}
                    />
                    <Input 
                        type="text"
                        label="Praticular"
                        className='my-2 px-2'
                        placeholder="Enter transection details"
                        {...register("particular")}                        
                    />
                    <Input 
                        type="number"
                        label="Amount"
                        placeholder="Enter the amunt"
                        className='my-2 px-2'
                        {...register("amount")}                        
                    />
                    <div className='flex'>
                        <Button type='submit' onClick={credit} bgColor='bg-green-500' className='w-full py-2 px-4 mt-2 mr-4 rounded-md'>Credit</Button>
                        <Button type='submit' onClick={debit} bgColor='bg-red-500' className='w-full py-2 px-4 mt-2 rounded-md'>Debit</Button>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default Transection