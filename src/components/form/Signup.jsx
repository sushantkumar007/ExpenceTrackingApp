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

    console.log("Signupt is Called")

    return (
        <div className='text-blue'>
            <div className='text-blue-500'>Signup to create account</div>
            <form onSubmit={handleSubmit(create)}>
                <div>
                <Input 
                label="Name: "
                type="text"
                placeholder="Enter your name"
                {...register("name", { 
                    required: true
                })}
                />
                <Input 
                label="Email: "
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                    required: true
                })}
                />
                <Input 
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true
                })}
                />
                <Button type="submit">
                    Create Account
                </Button>
                </div>
            </form>
        </div>
    )
}

export default Signup