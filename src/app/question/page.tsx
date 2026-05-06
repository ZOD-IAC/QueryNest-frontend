import React from 'react';
import QuestionsPage from '@/component/quesion/QuestionPage';
import { BASE_URL } from '@/utils/Setting';


const fetchPageData = async (params: any) => {
  const param = new URLSearchParams(params)
  const res = await fetch(`${BASE_URL}/question/api/get-questionList?${param}`, {
    method: 'GET'
  });

  const data = await res.json();

  return data;
}

async function page({ searchParams }: any) {
  const query = await searchParams;
  const data = await fetchPageData(query);
  console.log(data)

  return (
    <div>
      <QuestionsPage />
    </div>
  );
}

export default page;
