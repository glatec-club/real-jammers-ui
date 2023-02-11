import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import ForgotPassword from './routes/ForgotPassword'
import Dashboard from './containers/Dashboard'
import { AuthContextProvider } from './context/AuthContext'

const App = () => {
    return(
        <AuthContextProvider>
            <Routes>
                <Route path='/*' element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='forgotpassword' element={<ForgotPassword />} />
                <Route path='register' element={<Register />} />
                <Route path='dashboard/*' element={<Dashboard />} />
            </Routes>
        </AuthContextProvider>
    )
}

export default App