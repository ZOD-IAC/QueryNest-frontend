'use client'
import React from 'react';
interface userProp {
  svg: SVGAElement;
  className?: string;
}
function UserAvatar({ svg, className }: userProp) {
  if (!svg) return null;

  return (
    <div
      className={`w-9 h-9 rounded-full overflow-hidden border border-gray-300 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    ></div>
  );
}

export default UserAvatar;
