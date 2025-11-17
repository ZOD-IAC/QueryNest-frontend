import React from 'react';
import ProfilePage from '@/component/profile/ProfilePage';

const Page = ({ params }) => {
  const { slug } = params;
  console.log(slug, '<-- slug');
  return (
    <div>
      <ProfilePage userId={slug} />
    </div>
  );
};

export default Page;
