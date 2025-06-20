
import React from 'react';
import { Link } from 'react-router-dom'
export default function Header(){
    return(
        <>
        <header>
            <nav className="navbar flex justify-between px-6  py-6 items-center  bg-[#880808] text-white">
                <div className="logo">
                    <Link to={"/"}  >
                    <h1 className=''>BraveSpeak</h1>
                    </Link>
                </div>
                    <ul className="flex space-x-5">
                        <li>Home</li>
                         <li>Stories</li>
                          <li>Legal Aid</li>
                           <li>Help</li>
                           <li>Blog</li>
                    </ul>
                 </nav>
        </header> 
        
        </>
    )
}
