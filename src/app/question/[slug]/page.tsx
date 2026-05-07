import QuestionDetailPage from '@/component/quesion/QuestionDetailPage';
import React from 'react';
import { BASE_URL } from '@/utils/Setting';

const fetchPageData = async (params: string) => {
  const res = await fetch(
    `${BASE_URL}/question/api/get-question/${params}`,
    {
      method: 'GET',
    },
  );

  const data = await res.json();
  return data;
}

async function page({ params }: any) {
  const { slug } = await params;
  const data = await fetchPageData(slug)

  return (
    <div>
      <QuestionDetailPage data={data} />
    </div>
  );
}

export default page;
