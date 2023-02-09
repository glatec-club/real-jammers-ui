import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import { AuthContextProvider } from './context/AuthContext'

const App = () => {
    return(
        <AuthContextProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </AuthContextProvider>
    )
}

export default App