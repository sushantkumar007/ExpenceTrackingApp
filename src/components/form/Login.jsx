import React, { useState } from 'react'
import { Input, Button } from '../index'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { authService } from "../../appwrite/index"
import { useDispatch } from "react-redux"
import { login as authLogin } from "../../store/authSlice"

function Login() {
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async (data) => {
        const session = await authService.login(data)
        if (session) {
            authService.getCurrentUser().then((userData) => {
                if (userData) {
                    dispatch(authLogin({userData}))
                    navigate("/")
                }
            })
        }
    }

    return (
        <div className='w-full my-8'>
            <form onSubmit={handleSubmit(login)} className='w-4/5 mx-auto bg-gray-200 border border-black rounded'>
                <div className='p-6'>
                    <Input 
                    label= "Email: "
                    type= "email"
                    className="my-2 px-2"
                    placeholder= "Enter your email"
                    {...register("email", {
                        required: true
                    })}
                    />
                    <Input 
                    label= "Password: "
                    type= "password"
                    className="my-2 px-2"
                    placeholder= "Enter your password"
                    {...register("password", {
                        required: true
                    })}
                    />
                    <Button type= "submit" bgColor='bg-blue-500' className='w-full py-2 px-4 mt-2 rounded-md'>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )

}

export default Login;