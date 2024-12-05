import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import {useSelector,useDispatch} from "react-redux"
import {setLoading , setUser} from "../redux/user/userSlice.js"
import { toast } from 'sonner'
function SignIn() {
const [formData , setFormData] = useState({
    email: "",
    password:"",
    role:"",

})
const dispatch = useDispatch();
const {loading} = useSelector((state) => state.user)
const navigate = useNavigate()
function changeEventHandler(e) {
     setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit = async (e) => {
       e.preventDefault();
       try {
        dispatch(setLoading(true))
        const res = await  axios.post(`${USER_API_END_POINT}/signin`,formData,{
            headers:{"Content-Type": "application/json"},
            withCredentials:true
        });
        if (res.data.success) {
            dispatch(setLoading(false))
            dispatch(setUser(res.data.validUser))
            navigate('/')
            toast.success(res.data.message)
        }
         dispatch(setLoading(false))
       } catch (error) {
        dispatch(setLoading(false))
           toast.error(error.res.error.message)
       }
}
  return (
    <div className='flex items-center justify-center max-w-lg mx-auto'>
                <form onSubmit={handleSubmit} className=' w-full rounded-md p-4 my-10'>
                    <h1 className='font-bold text-center text-xl mb-5'>SignIn</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={formData.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={formData.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={formData.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    
                 <Button  disabled={loading} type="submit" className="w-full my-4 disabled:opacity-80">{loading ? "Loading...": "signin"}</Button>
                    
                    <span className='text-sm'>Don't have an account? <Link to="/sign-up" className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
    
  )
}

export default SignIn
