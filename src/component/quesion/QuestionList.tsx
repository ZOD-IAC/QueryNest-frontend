import QuestionCard from './QuestionCard';
import { Question } from '@/utils/contants/type';

// Question List Component
const QuestionList: React.FC<{ data: Question[] }> = ({ data }) => {
  if (!data) return;

  return (
    <div className='space-y-4'>
      {data?.map((question: Question) => {
        return <QuestionCard key={question._id} question={question} />;
      })}
    </div>
  );
};

export default QuestionList;
