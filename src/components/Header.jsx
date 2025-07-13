import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-[#2E003E] text-white">
      <nav className="flex justify-between items-center px-6 py-4 md:py-6">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link to="/">BraveSpeak</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-purple-300 text-[18px]">Home</Link></li>
          <li><Link to="/statistics" className="hover:text-purple-300 text-[18px]">Statistics</Link></li>
          <li><Link to="/laws" className="hover:text-purple-300 text-[18px]">Laws</Link></li>
          <li><Link to="/survivorStories" className="hover:text-purple-300 text-[18px]">Stories</Link></li>
          <li><Link to="/contact" className="hover:text-purple-300 text-[18px]">Contact</Link></li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Transparent Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Slide-in Menu from Right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#2E003E] text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeMenu}><X size={28} /></button>
        </div>
        <nav className="flex flex-col items-start space-y-4 p-6 text-[18px]">
          <Link to="/" onClick={closeMenu} className="hover:text-purple-300">Home</Link>
          <Link to="/statistics" onClick={closeMenu} className="hover:text-purple-300">Statistics</Link>
          <Link to="/laws" onClick={closeMenu} className="hover:text-purple-300">Laws</Link>
          <Link to="/survivorStories" onClick={closeMenu} className="hover:text-purple-300">Stories</Link>
          <Link to="/contact" onClick={closeMenu} className="hover:text-purple-300">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
