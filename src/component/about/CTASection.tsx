import React from 'react';
import Button from '../Button/Button';

// ============================================
// FILE: components/about/CTASection.tsx
// ============================================
const CTASection: React.FC = () => {
  return (
    <section className='py-20 bg-linear-to-r from-blue-600 to-indigo-700'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h2 className='text-4xl font-bold text-white mb-6'>
          Ready to Join Our Community?
        </h2>
        <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
          Be part of a global movement that&apos;s shaping the future of
          technology. Ask questions, share knowledge, and grow with millions of
          developers.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button variant='secondary' size='lg'>
            Get Started Free
          </Button>
          <Button href='/' variant='outline' size='lg'>
            <span className='text-white border-white hover:bg-white hover:bg-opacity-10'>
              Learn More
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
