
import React from 'react';
export default function ContactUs() {
  return(
   <section className='bg-gray-100 m-20 shadow-2xl rounded-2xl'>
    <h1 className='text-center pt-10 text-4xl font-bold text-[#2E003E]'>Contact Us</h1>
    <div className="main-container flex  justify-around p-10">
      
      
      
      <div className="left-container flex flex-col">
           <label htmlFor="name" className='text-lg text-[#2E003E] font-medium'>Name</label>
           <input type="text" id="name" name="name" placeholder='Your Name' required className=' p-2 mt-2  border border-purple-500 w-[500px] text-purple-950 rounded-[10px]' /> <br />
            <label htmlFor="email" className='text-lg text-[#2E003E] font-medium'>Email</label>
            <input type="email" id="email" name="email" placeholder='xyz@gmail.com' required className=' p-2 mt-2  border border-purple-500 w-[500px] text-purple-950 rounded-[10px]' /> <br />
            <label htmlFor="message" className='text-lg text-[#2E003E] font-medium'>Message</label>
            <textarea id="message" name="message" rows="4" placeholder='Your Message...' required className=' p-2 mt-2  border border-purple-500 w-[500px] text-purple-950 rounded-[10px]'></textarea> <br />
            <button className='bg-purple-900 text-white font-medium p-3 rounded-[10px]'>Send Message</button>
      </div>
      <div className="right-container flex flex-col">
              <h1 className='text-lg text-[#2E003E] font-medium mb-1'>Address</h1>
              <p className='mb-3 text-purple-900 '>123 justice Lane, Safe City, India</p>
              <h1 className='text-lg text-[#2E003E] font-medium mb-1'>Phone</h1>
              <p className='mb-3  text-purple-900 '>+91 12345 67890</p>
              <h1 className='text-lg text-[#2E003E] font-medium mb-1'>Email</h1>
              <p className=' text-purple-900 '>support@#BraveSpeak.com</p>
      </div>
    </div>
    </section>
  )
}