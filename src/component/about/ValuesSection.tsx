import { BookOpen, Globe, Heart, Lightbulb, Shield, Users } from 'lucide-react';
import React from 'react';

// ============================================
// FILE: components/about/ValuesSection.tsx
// ============================================
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  color,
}) => {
  return (
    <div className='bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100'>
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className='text-xl font-bold text-slate-900 mb-3'>{title}</h3>
      <p className='text-slate-600 leading-relaxed'>{description}</p>
    </div>
  );
};

const ValuesSection: React.FC = () => {
  const values = [
    {
      icon: <Heart className='w-7 h-7 text-red-600' />,
      title: 'Community First',
      description:
        'We prioritize building a supportive, inclusive community where every member feels valued and respected.',
      color: 'bg-red-100',
    },
    {
      icon: <Shield className='w-7 h-7 text-blue-600' />,
      title: 'Quality & Trust',
      description:
        'We maintain high standards for content quality and foster trust through verified answers and expert contributions.',
      color: 'bg-blue-100',
    },
    {
      icon: <Lightbulb className='w-7 h-7 text-amber-600' />,
      title: 'Innovation',
      description:
        'We continuously evolve our platform with cutting-edge features to enhance the learning experience.',
      color: 'bg-amber-100',
    },
    {
      icon: <Globe className='w-7 h-7 text-green-600' />,
      title: 'Global Access',
      description:
        'We believe knowledge should have no borders, making our platform accessible to developers everywhere.',
      color: 'bg-green-100',
    },
    {
      icon: <BookOpen className='w-7 h-7 text-purple-600' />,
      title: 'Continuous Learning',
      description:
        'We encourage lifelong learning and provide resources for developers at every stage of their journey.',
      color: 'bg-purple-100',
    },
    {
      icon: <Users className='w-7 h-7 text-indigo-600' />,
      title: 'Collaboration',
      description:
        'We foster collaboration and knowledge sharing, believing that together we can solve any challenge.',
      color: 'bg-indigo-100',
    },
  ];

  return (
    <section className='py-20 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-4'>
            Our Core Values
          </h2>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            These principles guide everything we do and shape the community
            we're building.
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
