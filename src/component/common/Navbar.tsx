'use client';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Querynest from '@/icons/Querynest';
import { User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAuthFromStorage } from '@/features/authslice';
import UserAvatar from './UserAvatar';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      dispatch(setAuthFromStorage(JSON.parse(stored)));
    }
  }, []);

  return (
    <nav className='border-b border-slate-200 sticky top-0 bg-white z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div>
            <Link href={'/'} className='flex items-center gap-2'>
              <Querynest height={'20px'} width={'20px'} color={'#BCA88D'} />
              <span className='text-xl font-bold text-slate-800'>
                QueryNest
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-6'>
            <div className='space-x-3.5'>
              <Link
                href={'/about-us'}
                className='text-slate-600 hover:text-slate-800 font-medium'
              >
                About us
              </Link>
              <Link
                href={'/question'}
                className='text-slate-600 hover:text-slate-800 font-medium'
              >
                Question
              </Link>
              <Link
                href={'/ranking'}
                className='text-slate-600 hover:text-slate-800 font-medium'
              >
                Ranking
              </Link>
              <Link
                href={'/trending'}
                className='text-slate-600 hover:text-slate-800 font-medium'
              >
                Trending
              </Link>
            </div>

            {isAuthenticated ? (
              <div className='flex items-center space-x-2.5 text-black'>
                <div className='flex  items-center justify-center space-x-1.5'>
                  <p>hi, {user.name}</p>
                  {user.avatar ? (
                    <Link
                      href={`/profile/${user.id}`}
                      className='flex text-white items-center rounded-full hover:shadow-md'
                    >
                      <UserAvatar svg={user.avatar} />
                    </Link>
                  ) : (
                    <Link
                      href={'/profile'}
                      className='flex text-white items-center bg-[#3E3F29] hover:bg-[#1d1e12] border-2 border-[#BCA88D] py-2 px-2 rounded-full hover:shadow-md'
                    >
                      <User2 size={20} />
                    </Link>
                  )}
                </div>

                <button
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem('auth');
                  }}
                  className='flex items-center text-sm border-2 gap-1.5 px-1.5 border-rose-600 h-8 rounded-md bg-rose-600 text-white hover:shadow-md'
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className='space-x-2.5 text-black'>
                <Link
                  href={'/login'}
                  className='border-2 border-[#BCA88D] py-1 px-3 rounded-md hover:shadow-md'
                >
                  Sign In
                </Link>
                <Link
                  href={'/register'}
                  className='border-2 border-[#3E3F29] py-1 px-3 rounded-md bg-[#3E3F29] text-white hover:shadow-md'
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden py-4 space-y-3'>
            <button className='block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg'>
              Questions
            </button>
            <button className='block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg'>
              Tags
            </button>
            <button className='block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg'>
              Community
            </button>
            <div className='px-4 space-y-2'>
              <Link href={'/login'}>Sign In</Link>
              <Link href={'/register'}>Get Started</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
