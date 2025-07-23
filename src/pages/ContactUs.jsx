import React from 'react';

export default function ContactUs() {
  return (
    <form action="https://api.web3forms.com/submit" method="POST">
      <section className='bg-gray-100 mx-4 my-10 md:mx-20 md:my-20 shadow-2xl rounded-2xl'>
        <h1 className='text-center pt-10 text-3xl md:text-4xl font-bold text-[#2E003E]'>Contact Us</h1>
        <div className="main-container flex flex-col lg:flex-row justify-around p-6 md:p-10 gap-10">
          <input type="hidden" name="access_key" value="9620de68-693f-4589-b226-c7b3b900267d" />

          {/* Left Form */}
          <div className="left-container flex flex-col w-full max-w-md mx-auto lg:mx-0">
            <label htmlFor="name" className='text-base md:text-lg text-[#2E003E] font-medium'>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Your Name'
              required
              className='p-2 mt-2 border border-purple-500 w-full text-purple-950 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-purple-600'
            /> <br />

            <label htmlFor="email" className='text-base md:text-lg text-[#2E003E] font-medium'>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='xyz@gmail.com'
              required
              className='p-2 mt-2 border border-purple-500 w-full text-purple-950 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-purple-600'
            /> <br />

            <label htmlFor="message" className='text-base md:text-lg text-[#2E003E] font-medium'>Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder='Your Message...'
              required
              className='p-2 mt-2 border border-purple-500 w-full text-purple-950 rounded-[10px] focus:outline-none focus:ring-1 focus:ring-purple-600'
            ></textarea> <br />

            <button className='bg-purple-900 text-white font-medium p-3 rounded-[10px] w-full'>Send Message</button>
          </div>

          {/* Right Info */}
          <div className="right-container w-full max-w-md mx-auto lg:mx-0 flex flex-col text-left">
            <h1 className='text-base md:text-lg text-[#2E003E] font-medium mb-1'>Address</h1>
            <p className='mb-3 text-purple-900'>123 Justice Lane, Safe City, India</p>
            <h1 className='text-base md:text-lg text-[#2E003E] font-medium mb-1'>Phone</h1>
            <p className='mb-3 text-purple-900'>+91 12345 67890</p>
            <h1 className='text-base md:text-lg text-[#2E003E] font-medium mb-1'>Email</h1>
            <p className='text-purple-900'>support@BraveSpeak.com</p>
          </div>
        </div>
      </section>
    </form>
  );
}
