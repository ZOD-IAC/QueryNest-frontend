import { MessageSquare } from "lucide-react";
import Button from "../Button/Button";

// Login Prompt Banner Component
const LoginPromptBanner: React.FC = () => {
  return (
    <div className='bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-8 text-center'>
      <div className='flex justify-center mb-4'>
        <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center'>
          <MessageSquare className='w-8 h-8 text-white' />
        </div>
      </div>
      <h3 className='text-2xl font-bold text-slate-800 mb-2'>
        Want to ask a question?
      </h3>
      <p className='text-slate-600 mb-6'>
        Join our community to ask questions, share knowledge, and connect with
        developers worldwide.
      </p>
      <div className='flex gap-3 justify-center'>
        <Button variant='primary'>Sign Up</Button>
        <Button variant='outline'>Log In</Button>
      </div>
    </div>
  );
};


export default LoginPromptBanner;