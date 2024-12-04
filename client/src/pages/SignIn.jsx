import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { Link,useNavigate } from 'react-router-dom'
export default function SignIn() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <form className=' rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 text-center'>Sign Up</h1>
                    <div className='my-2'>
                        
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="your@gmail.com"
                       
                        />
                    </div>
                    
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name="password"
                           placeholder="*********"
                     
                        />
                    </div>
                 <Button  type="submit" className="w-full my-4 disabled:opacity-80">signin</Button>
                    <span className='text-sm'>don't have an account? <Link to="/sign-up" className='text-blue-600'>signin</Link></span>
                </form>
    </div>
  )
}
