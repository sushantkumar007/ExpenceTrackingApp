import React, { useEffect } from 'react'
// import './App.css'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "./components/index"
import { authService } from './appwrite'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      dispatch(login({userData}))
    })
  }, [])

  return (
  <>
    <div className='w-full min-h-screen'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
  )
}

export default App