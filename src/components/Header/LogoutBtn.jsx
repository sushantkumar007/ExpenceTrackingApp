import React from 'react'
import { authService } from '../../appwrite/index';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandle = () => {
        authService.logout().then((status) => {
            if (status) {
                console.log("logout")
                dispatch(logout())
                navigate("/")
            }
        })
    }
    return (
        <button onClick={logoutHandle} className="mt-2 mx-1">
            Logout
        </button>
    )
}

export default LogoutBtn;