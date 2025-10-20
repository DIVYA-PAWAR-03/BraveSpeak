import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-[#2E003E] text-white shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield size={24} />
            </div>
              <Link to="/" className="hover:opacity-90 transition-opacity">
                BraveSpeak
              </Link>
          </div>


        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link
              to="/"
              className="text-sm font-medium hover:text-purple-300 transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/statistics"
              className="text-sm font-medium hover:text-purple-300 transition-colors relative group"
            >
              Statistics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/laws"
              className="text-sm font-medium hover:text-purple-300 transition-colors relative group"
            >
              Laws
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/survivorStories"
              className="text-sm font-medium hover:text-purple-300 transition-colors relative group"
            >
              Stories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-purple-900 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#2E003E] text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-6 border-b border-purple-800">
          <span className="text-xl font-bold">Menu</span>
          <button 
            onClick={closeMenu}
            className="p-2 hover:bg-purple-900 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-1">
          <Link 
            to="/" 
            onClick={closeMenu} 
            className="px-4 py-3 hover:bg-purple-900 rounded-lg transition-colors"
          >
            Home
          </Link>
          <Link
            to="/statistics"
            onClick={closeMenu}
            className="px-4 py-3 hover:bg-purple-900 rounded-lg transition-colors"
          >
            Statistics
          </Link>
          <Link
            to="/laws"
            onClick={closeMenu}
            className="px-4 py-3 hover:bg-purple-900 rounded-lg transition-colors"
          >
            Laws
          </Link>
          <Link
            to="/survivorStories"
            onClick={closeMenu}
            className="px-4 py-3 hover:bg-purple-900 rounded-lg transition-colors"
          >
            Stories
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="px-4 py-3 mt-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-center font-medium"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}