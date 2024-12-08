import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
  
export default function JobCard({job}) {
  return (
    <Card>
        <CardHeader className="">
           <CardTitle>{job.title}</CardTitle> 
        </CardHeader>
        <CardContent className="flex flex-col gap-4 flex-1">
            <div className='flex justify-between'>
                {job.logo && <img src={job.logo} className='h-6 rounded-sm' />}
                <div className='flex gap-2 items-center'>
                    <CiLocationOn size={15} /> {job.location}
                </div>
            </div>
            <hr/>
            {job.description.substring(0,60)}
        </CardContent>
        <CardFooter className="flex gap-2">
             <Link to={`/job/${job.id}`} >
             <Button varient="secondary " className="w-full text-white">More Detail </Button></Link>
        </CardFooter>
    </Card>
  )
}
