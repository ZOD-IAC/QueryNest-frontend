// ============================================
// FILE: components/about/ImpactSection.tsx

import { Award, MessageSquare, TrendingUp, Zap } from 'lucide-react';

// ============================================
interface ImpactStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

const ImpactStat: React.FC<ImpactStatProps> = ({
  icon,
  value,
  label,
  description,
}) => {
  return (
    <div className='text-center'>
      <div className='flex justify-center mb-4'>{icon}</div>
      <div className='text-4xl font-bold text-blue-600 mb-2'>{value}</div>
      <div className='text-lg font-semibold text-slate-900 mb-2'>{label}</div>
      <p className='text-sm text-slate-600'>{description}</p>
    </div>
  );
};

const ImpactSection: React.FC = () => {
  const stats = [
    {
      icon: <MessageSquare className='w-12 h-12 text-blue-600' />,
      value: '500M+',
      label: 'Questions Answered',
      description: 'Problems solved through community collaboration',
    },
    {
      icon: <Award className='w-12 h-12 text-green-600' />,
      value: '10M+',
      label: 'Expert Contributors',
      description: 'Developers sharing their knowledge',
    },
    {
      icon: <TrendingUp className='w-12 h-12 text-purple-600' />,
      value: '95%',
      label: 'Success Rate',
      description: 'Questions receiving accepted answers',
    },
    {
      icon: <Zap className='w-12 h-12 text-amber-600' />,
      value: '<30min',
      label: 'Avg Response Time',
      description: 'Fast answers when you need them most',
    },
  ];

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-slate-900 mb-4'>Our Impact</h2>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            Making a real difference in the lives of developers worldwide.
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12'>
          {stats.map((stat, index) => (
            <ImpactStat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
