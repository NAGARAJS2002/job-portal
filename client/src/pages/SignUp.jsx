import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@/components/ui/radio-group'
import { Button } from "@/components/ui/button"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {USER_API_END_POINT} from "../utils/constant.js"
import {toast} from "sonner"
export default function SignUp() {
  const [formData ,setFormData] =useState({
    username:"",
    email:"",
    password:"",
    role:"",
    file:"",
  })
  const [loading ,setLoading] = useState(false)
const navigate = useNavigate();
   
  function changeEventHandler(e) {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
 }

 function changeFileHandler(e) {
    setFormData({...formData,file : e.target.files?.[0]})
}
const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = new FormData();    //formdata object
    inputData.append("username", formData.username);
    inputData.append("email", formData.email);
    inputData.append("password", formData.password);
    inputData.append("role", formData.role);
    if (formData.file) {
        inputData.append("file", formData.file);
    }

    try {
        setLoading(true);
        const res = await axios.post(`${USER_API_END_POINT}/signup`, inputData, {
            headers: { 'Content-Type': "multipart/form-data" },
            withCredentials: true,
        });
        if (res.data.success) {
            navigate("/sign-in");
            toast.success(res.data.message);
        }
        setLoading(false)
    } catch (error) {
        console.log(error);
        setLoading(false)
        toast.error(error.response.data.message);
    } 
}
  return (
    <div className='flex items-center justify-center max-w-lg mx-auto'>
                <form onSubmit={ handleSubmit}className=' rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 text-center'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>User Name</Label>
                        <Input
                            type="text"
                            value={formData.username}
                            name="username"
                          
                            placeholder="username"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="your@gmail.com"
                            onChange={changeEventHandler}
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                          placeholder="*********"
                          onChange={changeEventHandler}
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
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                className="cursor-pointer"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                 <Button disabled={loading} type="submit" className="w-full my-4 disabled:opacity-80">{loading ? 'Loading...':'signup'}</Button>
                    <span className='text-sm'>Already have an account? <Link to="/sign-in" className='text-blue-600'>signin</Link></span>
                </form>
              
            </div>
      
  )
}
