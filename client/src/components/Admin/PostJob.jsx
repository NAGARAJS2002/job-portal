import React from 'react'
import { Input } from '../ui/input'
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogIn } from 'lucide-react';
export default function PostJob() {

  const [formData ,setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    location:"",
    file:null,
    requirements: "",

  });

  console.log(formData);
const [loading,setLoading] = useState(false)
const navigate = useNavigate();
  const handleSubmit =  async  (e) => {
    e.preventDefault();
    const inputData = new FormData();
    inputData.append("title",formData.title)
    inputData.append("description",formData.description)
    inputData.append("companyName",formData.companyName)
    inputData.append("location",formData.location)
    inputData.append("requirements",formData.requirements)
    if (formData.file) {
      inputData.append("file",formData.file)
    }
    try {
      setLoading(true)
      const res =  await axios.post(`${JOB_API_END_POINT}/createJob`,inputData,{
        Headers: {"Content-Type" : "multipart/form-data"},
        withCredentials: true,
      });
          console.log(res.data);
          
      if (res.data.success) {
        navigate('/jobs')
        setLoading(false)
        toast.success(res.data.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error(error.res.data.message)
    }
  }
  
  return (
    <div className='p-3 max-w-7xl mx-auto'>
      <h1 className='text-center font-bold text-2xl'>Create Job</h1>
      <form action="" onSubmit={handleSubmit} className='pt-3 flex flex-col gap-3' >
        <Input  type="text"
         placeholder="jobTitle" 
         name="title"
         onChange= {(e) => setFormData({...formData, title: e.target.value})}
          className=""/>
        <Textarea  type="text"
         placeholder="jobDescription" 
         name="description"
         onChange= {(e) => setFormData({...formData, description: e.target.value})}
          className=""/>
          <Input  type="text"
          name="companyName"
         placeholder="companyName" 
         onChange= {(e) => setFormData({...formData, companyName: e.target.value})}
          className=""/>
          <div className='flex flex-row gap-4'>
          <Select onValueChange={(value) => setFormData({...formData, location:value})} >
                  <SelectTrigger >
                      <SelectValue placeholder="location" />
                  </SelectTrigger>
                           <SelectContent>
                                 <SelectItem value="Chennai" >Chennai</SelectItem>
                                 <SelectItem value="Mumbai">Mumbai</SelectItem>
                                 <SelectItem value="Pune">Pune</SelectItem>
                                 <SelectItem value="Bangalore">Bangalore</SelectItem>
                                 <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                                 <SelectItem value="Delhi">Delhi</SelectItem>
                                 <SelectItem value="Kolkata">Kolkata</SelectItem>
                             </SelectContent>
           </Select>

           <Input type="file" name="file"  onChange={(e) => setFormData({...formData, file: e.target.files[0]})} />
          </div>
          <ReactQuill
          theme='snow'
          placeholder='Requirements'
          className='h-72 mb-12'
          required
          onChange={(value) => setFormData({...formData, requirements:value})}
        />
        <Button disabled={loading} type='submit' className="disabled:opacity-80 uppercase"> {loading ? 'Loading...' :  'Published'}</Button>
      </form>
    </div>
  )
}
