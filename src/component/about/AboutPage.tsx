'use client';
import React from 'react';
import HeroSection from './HeroSection';
import MissionSection from './MissonSection';
import ValuesSection from './ValuesSection';
import StorySection from './StorySection';
import TeamSection from './TeamMember';
import ImpactSection from './ImpactSection';
import CTASection from './CTASection';
import { useSelector } from 'react-redux';

// ============================================
// FILE: pages/AboutPage.tsx
// ============================================
const AboutPage: React.FC = () => {
  const { isAuthenticated , user } = useSelector((state) => state.auth);

  return (
    <div className='min-h-screen bg-white'>
      <HeroSection />
      <MissionSection userId={user?._id} />
      <ValuesSection />
      <StorySection />
      <TeamSection />
      <ImpactSection />
      {!isAuthenticated && <CTASection />}
    </div>
  );
};

export default AboutPage;
