import React from 'react';
import ProfilePage from '@/component/profile/ProfilePage';

const Page = async ({ params }) => {
  const { slug } = await params;
  console.log(slug , '<-- slug')
  return (
    <div>
      <ProfilePage userId={slug} />
    </div>
  );
};

export default Page;
