import React from 'react';

function UserAvatar({ svg }) {
  if (!svg) return null;

  return (
    <div
      className='w-9 h-9 rounded-full overflow-hidden border border-gray-300'
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default UserAvatar;
