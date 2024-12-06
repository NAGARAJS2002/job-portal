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

export default function PostJob() {
  return (
    <div className='p-3 max-w-7xl mx-auto'>
      <h1 className='text-center font-bold text-2xl'>Create Job</h1>
      <form action="" className='pt-3 flex flex-col gap-3' >
        <Input  type="text"
         placeholder="jobTitle" 
          className=""/>
        <Textarea  type="text"
         placeholder="jobDescription" 
          className=""/>
          <Input  type="text"
         placeholder="companyName" 
          className=""/>
          <div className='flex flex-row gap-4'>
          <Select>
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

           <Input type="file" name="file"  />
          </div>
          <ReactQuill
          theme='snow'
          placeholder='Recruitements'
          className='h-72 mb-12'
          required
        />
        <Button type='submit' > Published </Button>
      </form>
    </div>
  )
}
