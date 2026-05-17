import React from 'react';
import ProfilePage from '@/component/profile/ProfilePage';

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    tab: string;
  };
};

const Page = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;
  const { tab } = await searchParams;
  return (
    <div>
      <ProfilePage userId={slug} />
    </div>
  );
};

export default Page;
