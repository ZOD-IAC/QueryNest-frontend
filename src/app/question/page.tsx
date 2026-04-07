import React from 'react';
import QuestionsPage from '@/component/quesion/QuestionPage';

type Repo = {
  name: string
  stargazers_count: number
}
 
// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   const res = await fetch('')
//   const repo: Repo = await res.json()
//   // Pass data to the page via props
//   return { props: { repo } }
// }) satisfies GetServerSideProps<{ repo: Repo }>

function page() {
  return (
    <div>
      <QuestionsPage />
    </div>
  );
}

export default page;
