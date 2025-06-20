
import { Link } from 'react-router-dom'
import React from 'react'
export default function Landingpage(){
    return(
        <main className= "bg-cover h-screen" style={{ backgroundImage: "url('/images/bg-main.jpg')"}}>
        <div className='flex justify-around items-center'>
            <div className="left-section mt-10 px-44">
           <img src="/images/break-chain.png" alt="" className='h-[400px]' />
            </div>
            <div className="right-section px-44 mt-30 flex flex-col space-y-8">
                <h1 className='text-white text-5xl text-justify '>“Breaking the <br /> Silence, Seeking <br /> Justice”</h1>
                <button className='text-white px-3 py-4 bg-red-900 rounded-4xl'>Know your rights</button>
            </div>
        </div>
        </main>
    )
}