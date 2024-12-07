import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './pages/Header'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AdminProtectRoute from './components/Admin/AdminProtectRoute'
import PostJob from './components/Admin/PostJob'
import Profile from './pages/Profile'
import Jobs from './pages/Jobs'
export default function App() {
  return (
   <BrowserRouter>
    <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sign-up' element={<SignUp/>} />
    <Route path='/sign-in' element={<SignIn/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/jobs' element={<Jobs/>} />
    <Route element={<AdminProtectRoute/>}>
    <Route path='/create-job'  element={<PostJob/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}
