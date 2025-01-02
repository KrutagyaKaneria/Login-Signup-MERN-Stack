import { useState } from 'react'
import './App.css'
import { Navigate, Route,Routes } from 'react-router-dom'
import Login from './Pages/login';
import Signup from './Pages/signup';
import Home from './Pages/Home';


function App() {

  return (
    <>
     <div className="App">
      <Routes>
        <Route  path='/' element={<Navigate to="/Login"/>}/>
         <Route path='/login' element={<Login />}   />
         <Route path='/Signup' element={<Signup />}   />
         <Route path='/Home' element={<Home />}   />

      </Routes>
     </div>
    </>
  )
}

export default App
