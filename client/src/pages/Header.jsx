import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <div className='px-6 py-4'>
     <nav className='flex items-center justify-between'>
     <img src="/logo-dark.png" alt="logo" className='h-16 md:h-20' />
    <Link to={'/sign-up'}> <Button variant="outline" className="bg-black text-white">Sign In</Button>
    </Link>
     </nav>
     
    </div>
  )
}
