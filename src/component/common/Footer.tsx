import Solvly from '@/icons/Solvly';
import { Code2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className='bg-slate-900 text-slate-400 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <Solvly width={30} height={30} color={'white'} />
              <span className='text-lg font-bold text-white'>Solvly</span>
            </div>
            <p className='text-sm'>
              Empowering developers worldwide since 2025.
            </p>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Company</h4>
            <div className='space-y-2 text-sm flex flex-col'>
              <Link href={'/about'}>About</Link>
              <Link href={'/questions'}>Questions</Link>
              <Link href={'/trending'}>Trending</Link>
            </div>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Community</h4>
            <div className='space-y-2 text-sm'>
              <div>Questions</div>
              <div>Tags</div>
              <div>Users</div>
            </div>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Legal</h4>
            <div className='space-y-2 text-sm'>
              <div>Privacy</div>
              <div>Terms</div>
              <div>Guidelines</div>
            </div>
          </div>
        </div>
        <div className='border-t border-slate-800 mt-8 pt-8 text-center text-sm'>
          © 2025 Solvly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
