'use client';
import { Bomb, LaptopMinimalCheck, BadgeInfo } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '@/features/messageSlice';

function MessagePopUp() {
  const dispatch = useDispatch();
  const message = useSelector(
    (state: {
      message: {
        messageType: 'error' | 'info' | 'success';
        message: string;
      };
    }) => state.message
  );

  const bg_color = {
    error: 'bg-rose-500',
    info: 'bg-blue-500',
    success: 'bg-green-500',
  };

  const icon = {
    error: <Bomb />,
    info: <BadgeInfo />,
    success: <LaptopMinimalCheck />,
  };

  useEffect(() => {
    const clear = setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);

    () => clearMessage(clear);
  }, [message]);

  return (
    message.message.trim() !== '' && (
      <div className='fixed bottom-6 right-4 sm:right-6 z-50'>
        <div
          className={`flex items-center gap-3 ${
            bg_color[message.messageType]
          } text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg max-w-[90vw] sm:max-w-sm md:max-w-md animate-slideUp`}
        >
          <div className='shrink-0 text-white animate-pulse'>
            {icon[message.messageType]}
          </div>
          <p className='text-sm sm:text-base leading-snug'>{message.message}</p>
        </div>
      </div>
    )
  );
}

export default MessagePopUp;
