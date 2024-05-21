import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const navItems = [
        // {
        //     name: "Home",
        //     path: "/",
        //     active: true
        // },
        {
            name: "Login",
            path: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            path: "/signup",
            active: !authStatus
        },
    ]


    return (
        <>
            <nav className='w-full'>
                <ul className='w-full h-14 flex justify-end items-center px-8 bg-gray-400'>
                    <li className='mr-auto'>
                        <Link to="/">Home</Link>
                    </li>
                    {navItems.map((item) => item.active ? (
                        <li key={item.name} className='ml-12 hidden sm:block'>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ) : null)}                    
                    {authStatus && (
                        <li className='hidden sm:block'>
                            <LogoutBtn />
                        </li>
                    )}
                    <li 
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    className='sm:hidden'
                    >
                        {isSidebarOpen ? (<svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                        )}
                    </li>
                </ul>
                <div className={`w-full ${isSidebarOpen ? "flex" : "hidden"} justify-end sm:hidden`}>
                    <ul className='w-full max-w-sm flex flex-col items-center bg-gray-300'>
                        {navItems.map((item) => item.active ? (
                            <li
                                key={item.name} 
                                className='w-full h-12'>
                                <Link 
                                    to={item.path}
                                    className='w-full h-full flex justify-center items-center bg-gray-300 hover:text-white hover:bg-gray-500'>
                                        {item.name}
                                </Link>
                            </li>
                        ) : null)}                    
                        {authStatus && (
                            <li className='w-full h-12'>
                                <LogoutBtn className='w-full h-full flex justify-center items-center bg-gray-300 hover:text-white hover:bg-gray-500' />
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header