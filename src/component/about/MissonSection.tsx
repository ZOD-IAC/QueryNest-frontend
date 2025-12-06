'use client';
import React from 'react';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';

// ============================================
// FILE: components/about/MissionSection.tsx
// ============================================
const MissionSection: React.FC = ({ userId }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-4xl font-bold text-slate-900 mb-6'>
              Our Mission
            </h2>
            <p className='text-lg text-slate-600 mb-6 leading-relaxed'>
              At QueryNest, we believe that knowledge should be accessible to
              everyone. Our mission is to create a collaborative platform where
              developers of all skill levels can ask questions, share insights,
              and grow together.
            </p>
            <p className='text-lg text-slate-600 mb-6 leading-relaxed'>
              We&apos;re building more than just a Q&A platform—we&apos;re
              fostering a global community where curiosity is celebrated,
              expertise is valued, and every question brings us closer to
              solving the world&apos;s technological challenges.
            </p>
            {isAuthenticated ? (
              <Button
                variant='secondary'
                size='md'
                href={`/profile/${userId}?tab=ask`}
              >
                Ask a question
              </Button>
            ) : (
              <Button variant='secondary' size='md'>
                Join Our Community
              </Button>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center'>
              <div className='text-4xl font-bold text-blue-600 mb-2'>50M+</div>
              <div className='text-slate-600 font-medium'>Developers</div>
            </div>
            <div className='bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center'>
              <div className='text-4xl font-bold text-green-600 mb-2'>
                100M+
              </div>
              <div className='text-slate-600 font-medium'>Questions</div>
            </div>
            <div className='bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center'>
              <div className='text-4xl font-bold text-purple-600 mb-2'>1M+</div>
              <div className='text-slate-600 font-medium'>Daily Visitors</div>
            </div>
            <div className='bg-linear-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center'>
              <div className='text-4xl font-bold text-amber-600 mb-2'>190+</div>
              <div className='text-slate-600 font-medium'>Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
