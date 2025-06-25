import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-[#2E003E] text-white mt-10 py-8 px-6'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:space-x-8 space-y-8 md:space-y-0'>
        {/* Logo & Tagline */}
        <div className='flex-1'>
          <Link to={'/'}>
            <h1 className='text-3xl font-bold'>BraveSpeak</h1>
          </Link>
          <p className='text-[12px] font-light mt-1'>Voices that matter. Stories that inspire.</p>
        </div>

        {/* Contact Info */}
        <div className='flex-1'>
          <h3 className='font-semibold text-lg mb-2'>Contact</h3>
          <p className='text-sm'>Email: support@bravespeak.org</p>
          <p className='text-sm'>Helpline: 1800-123-456</p>
          <div className='mt-4'>
            <p className='text-sm'>Privacy Statement</p>
            <p className='text-sm'>Terms & Conditions</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className='flex-1'>
          <p className='text-sm'>
            BraveSpeak is dedicated to creating a safe space for voices to be heard,
            stories to be shared, and justice to be pursued.
          </p>
        </div>
      </div>

      <p className='text-center text-white mt-8 text-xs'>
        © {new Date().getFullYear()} BraveSpeak. All rights reserved.
      </p>
    </footer>
  );
}
