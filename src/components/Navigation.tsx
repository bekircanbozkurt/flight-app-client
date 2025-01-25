'use client';

import { FaPlaneDeparture, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaPlaneDeparture className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">LumFlights</span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Flights</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Destinations</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Link href="/login" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
              <FaUserCircle />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col py-4">
              <Link href="/" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="#" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Flights</Link>
              <Link href="#" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">Destinations</Link>
              <Link href="#" className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">About</Link>
              <div className="px-4 py-2">
                <Link href="/login" className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                  <FaUserCircle />
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 