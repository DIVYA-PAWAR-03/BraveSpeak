
import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer(){
    return(
        <footer className=' bg-[#2E003E] flex space-x-4 text-white mt-10 py-6 ' >
            <div className='px-5'>
                <Link to={'/'}>
                <h1 className='text-3xl font-bold pt-10'>BraveSpeak</h1>
                </Link>
                <p className='text-[10px] font-thin'>Voices that matter. Stories that inspire.</p>
                
            </div>
            <div className=' font-medium py-3 '>
                <p>Contact US</p>
                <p>Privacy statement</p>
                <h3 className="font-semibold">Contact</h3>
      <p>Email: support@bravespeak.org</p>
      <p>Helpline: 1800-123-456</p>
            </div>
            
    <div>
     <p className='pt-6'>
  BraveSpeak is dedicated to creating a safe space for voices to be heard, 
  stories to be shared, and justice to be pursued.
</p>
<p className="text-center text-white mt-4 text-sm">
    © {new Date().getFullYear()} BraveSpeak. All rights reserved.
  </p> 
  </div>
        </footer>
    )
}



