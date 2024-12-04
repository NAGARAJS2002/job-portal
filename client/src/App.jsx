import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './pages/Header'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
export default function App() {
  return (
   <BrowserRouter>
    <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sign-up' element={<SignUp/>} />
    <Route path='/sign-in' element={<SignIn/>} />
   </Routes>
   </BrowserRouter>
  )
}
