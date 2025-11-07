import React from 'react';

// ============================================
// FILE: components/about/TeamSection.tsx
// ============================================
interface TeamMemberProps {
  name: string;
  role: string;
  initial: string;
  color: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  initial,
  color,
}) => {
  return (
    <div className='text-center'>
      <div
        className={`w-24 h-24 ${color} rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4`}
      >
        {initial}
      </div>
      <h3 className='text-lg font-bold text-slate-900'>{name}</h3>
      <p className='text-slate-600'>{role}</p>
    </div>
  );
};

const TeamSection: React.FC = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-founder',
      initial: 'SJ',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-founder',
      initial: 'MC',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Community',
      initial: 'ER',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      name: 'David Kim',
      role: 'Lead Engineer',
      initial: 'DK',
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
    },
    {
      name: 'Lisa Anderson',
      role: 'Head of Product',
      initial: 'LA',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      name: 'James Wilson',
      role: 'Head of Design',
      initial: 'JW',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section className='py-20 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-4'>
            Meet Our Team
          </h2>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            The passionate people behind QueryNest, dedicated to building the
            best platform for developers.
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default TeamSection;