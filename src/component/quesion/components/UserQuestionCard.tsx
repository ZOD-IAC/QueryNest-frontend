'use client';
import React from 'react';
import UserQuestionsSidebar from '../UserQuestionSidebar';
import Button from '@/component/Button/Button';
import { getDataFromlocal } from '@/utils/helper';
import { Plus } from 'lucide-react';

function UserQuestionCard() {
  const user = getDataFromlocal();
  return (
    <aside className='lg:col-span-3 space-y-4'>
      <UserQuestionsSidebar isLoggedIn={isLoggedIn} />
      <Button fullWidth variant='primary' href={`/profile/${user.id}?tab=ask`}>
        <Plus className='w-5 h-5' />
        Ask Question
      </Button>
    </aside>
  );
}

export default UserQuestionCard;
