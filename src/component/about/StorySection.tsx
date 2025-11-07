import React from 'react';

// ============================================
// FILE: components/about/StorySection.tsx
// ============================================
const StorySection: React.FC = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-4'>Our Story</h2>
          <p className='text-xl text-slate-600'>How QueryNest came to be</p>
        </div>

        <div className='space-y-12'>
          <div className='flex gap-6'>
            <div className='shrink-0'>
              <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                2019
              </div>
            </div>
            <div>
              <h3 className='text-xl font-bold text-slate-900 mb-2'>
                The Beginning
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                QueryNest was founded by a group of developers who experienced
                firsthand the challenges of finding reliable answers to coding
                questions. Frustrated with scattered resources and outdated
                solutions, they envisioned a platform that would bring the
                developer community together.
              </p>
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='shrink-0'>
              <div className='w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold'>
                2020
              </div>
            </div>
            <div>
              <h3 className='text-xl font-bold text-slate-900 mb-2'>
                Rapid Growth
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Within the first year, QueryNest attracted over 1 million
                developers. The platform&apos;s intuitive design and focus on
                quality content resonated with the community, leading to
                exponential growth in both users and content.
              </p>
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='shrink-0'>
              <div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold'>
                2023
              </div>
            </div>
            <div>
              <h3 className='text-xl font-bold text-slate-900 mb-2'>
                Global Community
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                Today, QueryNest serves millions of developers across 190+
                countries. We&apos;ve expanded our features to include
                specialized communities, learning paths, and enterprise
                solutions, while staying true to our core mission of making
                knowledge accessible to all.
              </p>
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='shrink-0'>
              <div className='w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold'>
                2025
              </div>
            </div>
            <div>
              <h3 className='text-xl font-bold text-slate-900 mb-2'>
                The Future
              </h3>
              <p className='text-slate-600 leading-relaxed'>
                We&apos;re just getting started. With AI-powered features,
                enhanced collaboration tools, and a growing global community,
                QueryNest continues to innovate and evolve, shaping the future
                of developer education and collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
