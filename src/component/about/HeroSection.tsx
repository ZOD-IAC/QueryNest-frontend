import Querynest from '@/icons/Querynest';
import React from 'react';

// ============================================
// FILE: components/about/HeroSection.tsx
// ============================================
const HeroSection: React.FC = () => {
  return (
    <section className='relative bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <div className='flex justify-center mb-6'>
            <div className='w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center'>
              {/* <Code2 className='w-12 h-12 text-white' /> */}
              <Querynest height={50} width={50} />
            </div>
          </div>
          <h1 className='text-5xl md:text-6xl font-bold mb-6'>
            About QueryNest
          </h1>
          <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed'>
            Empowering developers worldwide to learn, share knowledge, and build
            the future of technology together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
