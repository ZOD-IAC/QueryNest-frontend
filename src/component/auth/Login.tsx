'use client';
import CustomButton from '@/component/Button/Button';
import Querynest from '@/icons/Querynest';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showMessage } from '@/features/messageSlice';
import { loginSuccess } from '@/features/authslice';
import { useRouter } from 'next/navigation';

interface formData {
  password: string;
  email: string;
}

// Login Page Component
const LoginPage = ({}) => {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleError = (message: string) => {
    dispatch(
      showMessage({
        message: message,
        messageType: 'error',
      })
    );
  };

  const handlechecks = (formData: formData) => {
    const { password, email } = formData;

    if (!password.trim() || !email.trim()) {
      handleError('All fields are required');
      return false;
    }

    if (email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      handleError('please enter a valid email');
      return false;
    }

    if (password.trim().length <= 8) {
      handleError('Password must have atleast 8 character');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!handlechecks(formData)) {
      return;
    }

    try {
      const res = await fetch('http://10.220.0.157:5000/user/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.ok) {
        console.log(data);
        alert('something went wrong');
        return;
      }

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      localStorage.setItem(
        'auth',
        JSON.stringify({ user: data.user, token: data.token })
      );

      console.log(data, '<-data');

      navigation.push('/');
    } catch (error) {
      console.error(error, 'something went wrong');
    }
    console.log('login:', formData);
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-slate-100 flex items-start justify-center p-4 pt-10'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <Querynest height={'40px'} width={'40px'} color={'#BCA88D'} />
            <h1 className='text-3xl font-bold text-slate-800'>QueryNest</h1>
          </div>
          <p className='text-slate-600'>Welcome back to our community</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-8'>
          <h2 className='text-2xl font-bold text-slate-800 mb-6'>Sign In</h2>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 w-5 h-5 text-zinc-800' />
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='w-full pl-10 pr-4 py-2.5 text-black border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='john@example.com'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 w-5 h-5 text-zinc-800' />
                <input
                  type='password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='w-full pl-10 pr-4 py-2.5 text-black border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='••••••••'
                />
              </div>
            </div>

            {/* <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData({ ...formData, remember: e.target.checked })
                  }
                  className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                />
                <span className='ml-2 text-sm text-slate-600'>Remember me</span>
              </label>
              <button className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
                Forgot password?
              </button>
            </div> */}

            <CustomButton
              variant='primary'
              fullWidth
              size='lg'
              onClick={handleSubmit}
            >
              Sign In
            </CustomButton>
          </div>

          <div className='mt-6 text-center'>
            <p className='text-slate-600'>
              Don&lsquo;t have an account?{' '}
              <Link
                href={'register'}
                className='text-blue-600 hover:text-blue-700 font-medium'
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
