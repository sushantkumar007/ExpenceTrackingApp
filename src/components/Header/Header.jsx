import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navItems = [
        {
            name: "Home",
            path: "/",
            active: true
        },
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
        <div className='w-full bg-gray-400'>
            <nav>
                <ul className='list-none flex justify-between'>
                    {navItems.map((item) => item.active ? (
                        <li key={item.name} className='my-2 mx-4'>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ) : null)}
                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Header