import React, { useState } from 'react'
import { authService } from "../../appwrite/index"
import { login } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { Input, Button } from "../index"

function Signup() {
    const [error, setError] =  useState("")
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const create = async (data) => {
        console.log(data)
        const user = await authService.createAccount(data)
        if (user) {
            authService.getCurrentUser().then((userData) => {
                dispatch(login({userData}))
                navigate("/")
            })
        }
    }

    return (
        <div className='w-full my-8 sm:mt-36'>
            <form onSubmit={handleSubmit(create)} className='w-4/5 mx-auto bg-gray-200 border border-black rounded sm:max-w-[350px]'>
                <div className='p-6'>
                    <Input 
                    label="Name: "
                    type="text"
                    className="my-2 px-2"
                    placeholder="Enter your name"
                    {...register("name", { 
                        required: true
                    })}
                    />
                    <Input 
                    label="Email: "
                    type="email"
                    className="my-2 px-2"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: true
                    })}
                    />
                    <Input 
                    label="Password: "
                    type="password"
                    className="my-2 px-2"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true
                    })}
                    />
                    <Button type="submit" bgColor='bg-blue-500' className='w-full py-2 px-4 mt-2 rounded-md'>
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Signup