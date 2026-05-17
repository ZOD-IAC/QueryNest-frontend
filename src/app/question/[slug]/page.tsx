import React from 'react';
import QuestionDetailPage from '@/component/quesion/QuestionDetailPage';

async function page({ params }: any) {
  const { slug } = await params;

  return (
    <div>
      <QuestionDetailPage slug={slug} />
    </div>
  );
}

export default page;
