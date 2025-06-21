
import { Link } from 'react-router-dom'
import React from 'react'
export default function Landingpage(){
    return(
        <main className= "bg-[#D6B4FC] h-[420px] ">
        <div className='flex justify-around items-center'>
            <div className="left-section mt-10 ">
           <img src="/images/break-chain.png" alt=""/>
            </div>
            <div className="right-section  mt-20 flex flex-col space-y-8">
                <h1 className='text-[#2E003E] text-5xl text-justify font-bold '>“Breaking the <br /> Silence, Seeking <br /> Justice”</h1>
                <button className='text-white px-3 py-4 bg-[#6A0DAD] rounded-4xl font-medium'>Know your rights</button>
            </div>
        </div>
        <div className='mt-50 text-center '  >
            <p className='text-purple-900 font-medium leading-9'>Every voice matters. Every story deserves to be heard. <br />
  For far too long, survivors of sexual violence have been silenced by fear, shame, or stigma. But silence protects no one. <br />

We stand with the brave individuals who speak up — not just for themselves, but for those who still can’t. <br />
This platform is a safe space for support, awareness, and action. Whether you're a survivor, ally, or advocate, your presence here fuels change. <br />
 <b className='bg-[#2E003E] text-white px-3'>Break the silence. Speak your truth. Justice begins with your voice.</b></p>
        </div>
        <div className='mt-48'>
            <h1 className='text-center text-4xl font-medium text-[#2E003E]'>Daily Rape Cases:</h1>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero minima quo, voluptatibus fugit inventore amet repellendus explicabo. Ab modi soluta, qui voluptatibus laboriosam, optio assumenda maxime hic, magnam quos doloremque.
        </div>
        </main>
    )
}