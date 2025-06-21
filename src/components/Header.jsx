
import React from 'react';
import { Link } from 'react-router-dom'
export default function Header(){
    return(
        <>
        <header>
            <nav className="navbar flex justify-between px-6  py-6 items-center  bg-[#2E003E] text-white ">
                <div className="logo">
                    <Link to={"/"}  >
                    <h1 className='text-3xl font-bold'>BraveSpeak</h1>
                    </Link>
                </div>
                    <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-red-400 text-[20px]">Home</Link>
          </li>
          <li>
            <Link to="/statistics" className="hover:text-red-400  text-[20px]">Statistics</Link>
          </li>
          <li>
            <Link to="/laws" className="hover:text-red-400  text-[20px]">Laws</Link>
          </li>
          <li>
            <Link to="/support" className="hover:text-red-400  text-[20px]">Support</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-400  text-[20px]">Contact</Link>
          </li>
        </ul>
                 </nav>
        </header> 
        
        </>
    )
}
