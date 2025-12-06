import React from 'react';
import QuestionDetailPage from '@/component/quesion/QuestionDetailPage';

async function page({ params }) {
  const { slug } = await params;

  return (
    <div>
      <QuestionDetailPage questionId={slug} />
    </div>
  );
}

export default page;
