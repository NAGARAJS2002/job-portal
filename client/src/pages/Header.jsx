import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from "@/components/ui/avatar"


export default function Header() {
 const {currentUser}= useSelector((state) => state.user)
  console.log(currentUser);
  
  return (
    <div className='px-6 py-4'>
     <nav className='flex items-center justify-between'>
     <img src="/logo-dark.png" alt="logo" className='h-16 md:h-20' />
   {
    currentUser ? (
     <Link to='/Profile'>
      <Avatar>
        <AvatarImage src={currentUser?.profile?.profilePhoto} alt="@shadcn" />
      </Avatar>
     </Link>
    ):
    (
      <Link to={'/sign-up'}> <Button variant="outline" className="bg-black text-white">Sign In</Button> </Link>
    )
   }
    
     
 
     </nav>
     
    </div>
  )
}
