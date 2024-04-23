import React, { useState } from 'react'
import { databaseService } from '../../appwrite/index'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input, Button, Select } from "../index"
import { useSelector, useDispatch } from 'react-redux'
import { addTransection as addStatement } from "../../store/statementSlice"

function TransectonForm() {
    const [error, setError] = useState("")
    const {register, handleSubmit, reset} = useForm()
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const addTransection = async (data) => {
        data.userId = userData.$id

        databaseService.createTransection(data)
        .then((transection) => {
            if (transection) {
                dispatch(addStatement(transection))
                console.log(transection)
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
        <div className='w-full mx-auto bg-gray-300'>
            <form onSubmit={handleSubmit(addTransection)} className='w-4/5 mx-auto'>
                <div>
                    <Input 
                    type="text"
                    label="Date"
                    placeholder="Enter the date"
                    className='my-2 px-2'
                    {...register("date", {
                        required: true
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
                    <Select
                    options={["Cr", "Dr"]}
                    className="block py-2 px-4 bg-green-400"
                    {...register("status", {
                        required: true
                    })}
                    />
                    <Button type='submit' bgColor='bg-blue-500' className='w-full py-2 px-4 mt-2 rounded-md'>Add</Button>
                </div>
            </form>
        </div>
    )
}

export default TransectonForm