import { Link } from 'react-router-dom';
import React from 'react';

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className='flex flex-col md:flex-row justify-around items-center bg-[#D6B4FC] py-16 px-6 rounded-b-3xl shadow-md'>
        <div className="left-section">
          <img src="/images/break-chain.png" alt="Break the Chain" className="w-full max-w-md drop-shadow-lg" />
        </div>

        <div className="right-section mt-10 md:mt-0 flex flex-col space-y-8 text-center md:text-left">
          <h1 className='text-[#2E003E] text-4xl md:text-5xl font-bold leading-tight'>
            “Breaking the <br className="hidden md:block" /> Silence, Seeking <br className="hidden md:block" /> Justice”
          </h1>
          <Link to={'/laws'}>
            <button className='text-white px-10 py-4 bg-[#6A0DAD] rounded-full font-semibold shadow-lg hover:bg-[#5e0c9f] transition duration-300'>
              Know Your Rights
            </button>
          </Link>
        </div>
      </section>

      {/* Message Section */}
      <section className='mt-16 text-center px-6'>
        <p className='text-purple-900 font-medium leading-8 text-lg bg-purple-100 py-10 px-6 max-w-4xl m-auto rounded-2xl shadow-lg'>
          Every voice matters. Every story deserves to be heard.
          For far too long, survivors of sexual violence have been silenced by fear, shame, or stigma. But silence protects no one.
          <br /><br />
          We stand with the brave individuals who speak up — not just for themselves, but for those who still can’t.
          This platform is a safe space for support, awareness, and action.
          <br /><br />
          <b className='bg-[#2E003E] text-white px-3 py-1 rounded'>Break the silence. Speak your truth. Justice begins with your voice.</b>
        </p>
      </section>

      {/* Daily Case Stats */}
      <section className='mt-24 px-6'>
        <h2 className='text-center text-4xl font-semibold text-[#4d0864] mb-6'>Daily Rape Cases in India</h2>
        <div className="bg-purple-50 p-6 max-w-3xl mx-auto rounded-xl shadow-md text-purple-700 text-center">
          <p className="text-lg">
            According to the NCRB (2022), a rape case is reported every <strong>16 minutes</strong> in India.
            These numbers highlight the urgent need for awareness, legal protection, and community support.
          </p>
        </div>
      </section>

      {/* Awareness Section */}
      <section className='mt-24 px-6'>
        <h2 className='text-center text-4xl font-semibold text-[#4d0864] mb-6'>Why Awareness Matters</h2>
        <p className='text-center max-w-4xl mx-auto text-purple-700 text-lg leading-relaxed'>
          Awareness is the first step toward prevention. Understanding the laws, knowing your rights,
          and recognizing signs of harassment or abuse can empower individuals and communities
          to act before harm is done.
          <br /><br />
          Lack of awareness often leads to silence, shame, and injustice. Many survivors don’t even know what counts as harassment, or that they have legal protection.
          <br /><br />
          Awareness isn’t just about reading laws — it’s about recognizing boundaries, understanding consent,
          and creating a culture where victims feel safe to speak. When people are informed, they can act. 
          When a society is aware, it becomes safer, stronger, and more just.
        </p>
      </section>

      {/* How You Can Help Section */}
      <section className='mt-24 px-6'>
        <h2 className='text-center text-4xl font-semibold text-[#4d0864] mb-6'>How You Can Help</h2>
        <ul className='list-disc max-w-4xl mx-auto text-purple-700 text-lg space-y-3 px-6'>
          <li>Listen without judgment if someone confides in you.</li>
          <li>Report incidents and stand as a witness if safe to do so.</li>
          <li>Share verified information and resources.</li>
          <li>Support organizations working for survivor safety and rights.</li>
          <li>Use your voice on social media to spread awareness and empathy.</li>
        </ul>
      </section>

      {/* Call to Action Section */}
      <section className='bg-purple-100 p-10 max-w-4xl mx-auto mt-24 rounded-xl shadow-lg text-purple-800 text-center'>
        <h2 className='text-4xl font-semibold mb-4'>Be the Voice for the Voiceless</h2>
        <p className='text-lg leading-relaxed'>
          Change begins with awareness, but it doesn't stop there. Stand up, speak out,
          and support survivors in your community. Join our mission to create a safer, more just world for all.
        </p>
        <Link to='/survivorStories'>
          <button className='mt-6 px-6 py-3 bg-purple-800 text-white rounded-full hover:bg-purple-900 transition duration-300'>
            Read Real Stories
          </button>
        </Link>
      </section>
    </main>
  );
}
