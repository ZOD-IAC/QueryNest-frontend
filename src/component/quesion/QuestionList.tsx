import QuestionCard from "./QuestionCard";

// Types
interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  isAnswered: boolean;
}

// Question List Component
const QuestionList: React.FC = () => {
  const mockQuestions: Question[] = [
    {
      id: 1,
      title: 'How to implement authentication in React with TypeScript?',
      content:
        "I'm building a React application with TypeScript and need to implement user authentication. What's the best approach to handle JWT tokens and protect routes?",
      author: 'John Doe',
      authorAvatar: '',
      tags: ['React', 'TypeScript', 'Authentication'],
      votes: 42,
      answers: 5,
      views: 1203,
      createdAt: '2 hours ago',
      isAnswered: true,
    },
    {
      id: 2,
      title: 'MongoDB query optimization for large datasets',
      content:
        'I have a collection with 10M+ documents and queries are getting slow. What indexing strategies should I use?',
      author: 'Jane Smith',
      authorAvatar: '',
      tags: ['MongoDB', 'Database', 'Performance'],
      votes: 28,
      answers: 3,
      views: 856,
      createdAt: '5 hours ago',
      isAnswered: true,
    },
    {
      id: 3,
      title: 'Express.js middleware execution order',
      content:
        "Can someone explain the order in which middleware functions are executed in Express.js? I'm confused about error handling middleware placement.",
      author: 'Mike Johnson',
      authorAvatar: '',
      tags: ['Node.js', 'Express', 'Middleware'],
      votes: 15,
      answers: 0,
      views: 234,
      createdAt: '1 day ago',
      isAnswered: false,
    },
    {
      id: 4,
      title: 'Best practices for React component composition',
      content:
        'What are the recommended patterns for composing reusable React components? Should I use render props or custom hooks?',
      author: 'Sarah Wilson',
      authorAvatar: '',
      tags: ['React', 'Best Practices', 'Components'],
      votes: 67,
      answers: 8,
      views: 2104,
      createdAt: '3 days ago',
      isAnswered: true,
    },
    {
      id: 5,
      title: 'TypeScript generic constraints with interfaces',
      content:
        "I'm trying to create a generic function that works with objects implementing a specific interface. How do I properly constrain the generic type?",
      author: 'Alex Brown',
      authorAvatar: '',
      tags: ['TypeScript', 'Generics', 'Interfaces'],
      votes: 23,
      answers: 2,
      views: 445,
      createdAt: '6 hours ago',
      isAnswered: false,
    },
  ];

  return (
    <div className='space-y-4'>
      {mockQuestions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;