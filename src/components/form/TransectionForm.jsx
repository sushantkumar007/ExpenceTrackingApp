import React, { useState } from 'react'
import { databaseService } from '../../appwrite/index'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input, Button } from "../index"
import { useSelector, useDispatch } from 'react-redux'
import { addStatement } from "../../store/statementSlice"

function TransectonForm() {
    const {register, handleSubmit, reset} = useForm()
    const [error, setError] = useState("")
    const [transectionType, setTransectionType] = useState("")
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const credit = () => {
        setTransectionType("Cr")
    }

    const debit = () => {
        setTransectionType("Dr")
    }

    const addTransection = async (data) => {
        if (transectionType === "Cr") {
            data.status = "Cr"
        }
        else if (transectionType === "Dr") {
            data.status = "Dr"
        }
        data.userId = userData.$id

        databaseService.createTransection(data)
        .then((transection) => {
            if (transection) {
                databaseService.getStatement(userData.$id).then((transections) => {
                    dispatch(addStatement({transections}))
                })
                console.log("post is created")
                reset({
                    date: "",
                    particular: "",
                    amount: ""
                })
            }
        })
        .catch((error) => {
            console.log(error)
            setError(error)
        })
    }

    return (
        <div className='max-w-xs lg:max-w-[900px] mx-auto mt-[35px] py-8 rounded-lg bg-gray-300'>
            <form onSubmit={handleSubmit(addTransection)} className='w-4/5 mx-auto lg:w-[90%]'>
                <div className="lg:flex justify-between items-center">
                    <Input 
                    type="date"
                    label="Date"
                    placeholder="Enter the date"
                    className='my-2 px-2 mr-2'
                    {...register("date", {
                        required: true,
                    })}
                    />
                    <Input 
                    type="text"
                    label="Praticular"
                    className='my-2 px-2'
                    placeholder="Enter transection details"
                    {...register("particular", {
                        required: true
                    })}
                    />
                    <Input 
                    type="number"
                    label="Amount"
                    placeholder="Enter the amunt"
                    className='my-2 px-2'
                    {...register("amount", {
                        required: true
                    })}
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

export default TransectonForm