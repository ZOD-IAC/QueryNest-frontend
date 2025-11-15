'use client';
import React, { useState } from 'react';
import { Mail, Lock, User, Eye } from 'lucide-react';
import CustomButton from '@/component/Button/Button';
import Link from 'next/link';
import Querynest from '@/icons/Querynest';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/features/authslice';
import { useRouter } from 'next/navigation';
import { showMessage } from '@/features/messageSlice';

interface formData {
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
}

// Register Page Component
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState('');

  const handleError = (message: string) => {
    dispatch(
      showMessage({
        message: message,
        messageType: 'error',
      })
    );
  };

  const handlechecks = (formData: formData) => {
    const { password, confirmPassword, name, email } = formData;

    if (
      !password.trim() ||
      !confirmPassword.trim() ||
      !name.trim() ||
      !email.trim()
    ) {
      handleError('All fields are required');
      return false;
    }

    if (name.length < 3 || !/[a-zA-Z ]+$/.test(name.trim())) {
      handleError('please enter a valid name');
      return false;
    }

    if (email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      handleError('please enter a valid email');
      return false;
    }

    if (password.trim().length <= 7) {
      handleError('Password must have atleast 8 character');
      return false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      handleError('Password does not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!handlechecks(formData)) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.ok) {
        alert('something went wrong');
        return;
      }

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      dispatch(
        showMessage({
          message: data.message,
          messageType: 'success',
        })
      );

      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: data.user,
          token: data.token,
          isAuth: true,
        })
      );

      console.log(data, '<-data');

      navigation.push('/');
    } catch (error) {
      console.error(error, 'something went wrong');
      setErrors('something went wrong!');
    }
    console.log('Register:', formData);
  };

  return (
    <div className='min-h-dvh bg-linear-to-br from-blue-50 to-slate-100 flex items-start justify-center p-4 pt-10 text-black'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <Querynest height={'40px'} width={'40px'} color={'#BCA88D'} />
            <h1 className='text-3xl font-bold text-slate-800'>QueryNest</h1>
          </div>
          <p className='text-slate-600'>Join our developer community</p>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-8'>
          <h2 className='text-2xl font-bold text-slate-800 mb-6'>
            Create Account
          </h2>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-3 w-5 h-5 text-[#3E3F29]' />
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className='placeholder:text-zinc-400 w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='John Doe'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 w-5 h-5 text-[#3E3F29]' />
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className='placeholder:text-zinc-400 w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='john@example.com'
                />
              </div>
            </div>

            <div>
              <label className='flex text-sm font-medium text-slate-700 mb-2 items-center justify-between'>
                Password{' '}
                <button
                  onClick={() => setShowPass((s) => !s)}
                  className='cursor-pointer'
                >
                  <Eye size={20} color={showPass ? 'blue' : 'black'} />
                </button>
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 w-5 h-5 text-[#3E3F29]' />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className='placeholder:text-zinc-400 w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <div>
              <label className='flex text-sm font-medium text-slate-700 mb-2 items-center justify-between'>
                Confirm Password
                <button
                  onClick={() => setShowPass((s) => !s)}
                  className='cursor-pointer'
                >
                  <Eye size={20} color={showPass ? 'blue' : 'black'} />
                </button>
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 w-5 h-5 text-[#3E3F29]' />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className='placeholder:text-zinc-400 w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='••••••••'
                />
              </div>
            </div>

            <CustomButton
              variant='primary'
              fullWidth
              size='lg'
              onClick={handleSubmit}
            >
              Create Account
            </CustomButton>
          </div>

          <div className='mt-6 text-center'>
            <p className='text-slate-600'>
              Already have an account?{' '}
              <Link
                href={'/login'}
                className='text-blue-600 hover:text-blue-700 font-medium'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
