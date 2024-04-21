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
        <div className='bg-green w-full'>
            <form onSubmit={handleSubmit(login)}>
                <Input 
                label= "Email: "
                type= "email"
                placeholder= "Enter your email"
                {...register("email", {
                    required: true
                })}
                />
                <Input 
                label= "Password"
                type= "password"
                placeholder= "Enter your password"
                {...register("password", {
                    required: true
                })}
                />
                <Button type= "submit">
                    Login
                </Button>
            </form>
        </div>
    )

}

export default Login;