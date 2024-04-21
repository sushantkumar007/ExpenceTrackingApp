import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AddTransection, Home, Login, Signup, Statement} from './pages/index.js'
import { Provider } from 'react-redux'
import store from "./store/store.js"

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: ""
      },
      {
        element: <Statement />,
        path: "/statement"
      },
      {
        element: <AddTransection />,
        path: "/addTransection"
      },
      {
        element: <Login />,
        path: "/login"
      },
      {
        element: <Signup />,
        path: "/signup"
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
