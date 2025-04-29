import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './Components/Auth/Login.jsx'
import Signup from './Components/Auth/Signup.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'

function App() {
  return (
    <div>
      
       <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />

         <Route path="/" element={
          <ProtectedRoute>
            <Home />    
          </ProtectedRoute>} />
       </Routes>

      
    </div>
  )
}

export default App