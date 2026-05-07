'use client';
import React from 'react';
import UserQuestionsSidebar from '../UserQuestionSidebar';
import Button from '@/component/Button/Button';
import { Plus } from 'lucide-react';
import { UserProfile } from '@/utils/contants/type';

interface props {
  isAuthenticated: boolean,
  user: UserProfile
}

const UserQuestionCard: React.FC<props> = ({ isAuthenticated, user }) => {
  return (
    <aside className='lg:col-span-3 space-y-4'>
      <UserQuestionsSidebar isAuthenticated={isAuthenticated} user={user._id} />

      {isAuthenticated && (
        <Button fullWidth variant='primary' href={`/profile/${user._id}?tab=ask`}>
          <Plus className='w-5 h-5' />
          Ask Question
        </Button>
      )}
    </aside>
  );
}

export default UserQuestionCard;
