import React, { useState } from 'react'
import { databaseService } from '../../appwrite/index'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input, Button, Select } from "../index"
import { useSelector } from 'react-redux'

function TransectonForm() {
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    
    const addTransection = async (data) => {
        data.userId = userData.$id

        databaseService.createTransection(data)
        .then((transection) => {
            if (transection) {
                navigate("/")
            }
        })
        .catch((error) => {
            setError(error)
        })
    }

    return (
        <div className='w-full bg-gray-300'>
            <form onSubmit={handleSubmit(addTransection)}>
                <Input 
                type="text"
                // placeholder="Enter the date"
                className="my-2 mx-2"
                {...register("date", {
                    required: true
                })}
                />
                <Input 
                type="text"
                placeholder="Enter transection details"
                className="my-2 mx-2"
                {...register("particular", {
                    required: true
                })}
                />
                <Input 
                type="number"
                className="my-2 mx-2"
                {...register("amount", {
                    required: true
                })}
                />
                <Select
                options={["Dr", "Cr"]}
                className="my-2 mx-2"
                {...register("status", {
                    required: true
                })}
                />
                <Button type='submit'>Add</Button>
            </form>
        </div>
    )
}

export default TransectonForm