import React from 'react';
import ProfilePage from '@/component/profile/ProfilePage';

type PageProps = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return (
    <div>
      <ProfilePage userId={slug} />
    </div>
  );
};

export default Page;
