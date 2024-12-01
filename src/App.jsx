import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './pages/Header'
import Home from './pages/Home'
export default function App() {
  return (
   <BrowserRouter>
    <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    
   </Routes>
   </BrowserRouter>
  )
}
