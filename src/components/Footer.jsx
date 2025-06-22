
import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer(){
    return(
        <footer className=' bg-[#2E003E] flex space-x-4 text-white mt-10 h-[150px]' >
            <div>
                <Link to={'/'}>
                <h1>BraveSpeak</h1>
                </Link>
                
            </div>
            <div>
                <p>Contact US</p>
                <p>Privacy statement</p>
            </div>
        </footer>
    )
}



