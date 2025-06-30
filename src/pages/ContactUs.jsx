
import React from 'react';
export default function ContactUs() {
  return(
   <section className='bg-gray-100 m-20'>
    <h1 className='text-center pt-10 text-4xl font-bold text-[#2E003E]'>Contact Us</h1>
    <div className="main-container flex  justify-around p-10">
      
      
      
      <div className="left-container flex flex-col">
           <label htmlFor="name">Name</label>
           <input type="text" id="name" name="name" required /> <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required /> <br />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea> <br />
            <button>Send Message</button>
      </div>
      <div className="right-container">
              <h1>Address</h1>
              <p>123 justice Lane, Safe City, India</p>
              <h1>Phone</h1>
              <p>+91 12345 67890</p>
              <h1>Email</h1>
              <p>support@#BraveSpeak.com</p>
      </div>
    </div>
    </section>
  )
}