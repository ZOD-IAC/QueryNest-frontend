import { Code2 } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <footer className='bg-slate-900 text-slate-400 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <Code2 className='w-6 h-6 text-blue-500' />
              <span className='text-lg font-bold text-white'>QueryNest</span>
            </div>
            <p className='text-sm'>
              Empowering developers worldwide since 2025.
            </p>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Company</h4>
            <div className='space-y-2 text-sm'>
              <div>About</div>
              <div>Careers</div>
              <div>Press</div>
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
          © 2025 QueryNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
