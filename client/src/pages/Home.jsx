import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import faqs from "../data/faq.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className='text-center'>
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">  Find Your Dream Job
            <span className="flex items-center gap-2 sm:gap-6">
            and get
            <img
              src="/logo-dark.png"
              className="h-14 sm:h-24 lg:h-32"
              alt="Hirrd Logo"
            />
            </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className='flex gap-6 pt-8 justify-center'>
      <Button variant="blue" size="xl">
            Find Jobs
          </Button>

          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
      </div>
          <img src="/banner.jpeg" alt="banner" className='w-full p-6' />
          <section className="grid grid-cols-1 md:grid-cols-2 px-6 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      <Accordion type="multiple" className="w-full px-6">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
