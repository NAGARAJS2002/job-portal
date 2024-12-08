import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'

export default function Jobs() {
  const [jobsData,setJobData] = useState([])
  useEffect(() => {
    const getAllJob = async () => {
       try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
        if (res.data.success) {
             setJobData(res.data.job)
             console.log(res.data.job);
             
        }
       } catch (error) {
          console.log(error);
          
       }
    }
    getAllJob()
  },[])

  return (
  <div>
<h1 className=''>Latest Jobs</h1>
{/*  add filter    */}

<div className='mt-8 p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 '>
  {
    jobsData?.length ? (
      jobsData.map((job) => {
        return <JobCard key={job.id}  job={job} />
      })
    ):(
      <div>No JobsFound</div>
    )
  }
</div>
  </div>

  )
}
