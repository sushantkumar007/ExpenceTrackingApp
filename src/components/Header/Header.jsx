import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
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
        <div className='w-full bg-gray-400'>
            <nav>
                <ul className='list-none flex justify-end'>
                    <li className='my-2 ml-4 mr-auto'>
                        <Link to="/" >
                            Home
                        </Link>
                    </li>
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
                {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 24 24">
<path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"></path>
</svg> */}
                <img src="../../assets/menu.svg" alt="" />
            </nav>
        </div>
    )
}

export default Header