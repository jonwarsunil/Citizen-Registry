import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import { Logo } from './Icon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='bg-white w-full sticky top-0 border-b border-[#E5E8EB] z-50'>
      <div className='container mx-auto px-4 sm:px-6'>
        <div className='py-3 flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='text-lg gap-2 flex items-center font-bold text-[#121417]'>
            <Logo />
            <span>Citizen Registry</span>
          </Link>

          {/* Desktop nav */}
          <nav className='hidden sm:flex gap-8 items-center text-sm font-normal text-[#121417]'>
            <Link to='/' className='hover:underline'>
              Home
            </Link>
            <Link to='/citizens' className='hover:underline'>
              Citizens
            </Link>
            <Link to='/create' className='hover:underline'>
              Add Citizen
            </Link>
            <WalletConnect compact />
          </nav>

          {/* Mobile hamburger */}
          <div className='sm:hidden flex items-center gap-4'>
            <WalletConnect compact />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-[#121417] focus:outline-none'
              aria-label='Toggle Menu'
            >
              {isMenuOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className='sm:hidden flex flex-col gap-4 px-4 pb-4 text-sm font-normal text-[#121417]'>
            <Link to='/' className='hover:underline' onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to='/citizens' className='hover:underline' onClick={() => setIsMenuOpen(false)}>
              Citizens
            </Link>
            <Link to='/create' className='hover:underline' onClick={() => setIsMenuOpen(false)}>
              Add Citizen
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
