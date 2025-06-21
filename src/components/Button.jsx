import React from 'react';

export default function Button({ children, onClick, disabled = false, className = '', type = 'button' }) {
  const baseClasses = `
    px-4 py-3 
    rounded-[12px] 
    font-semibold 
    transition-colors duration-200 
    focus:outline-none 
    focus:ring-2 focus:ring-offset-1 
    focus:ring-[#DBE8F2]
  `;

  const enabledClasses = 'bg-[#DBE8F2] text-[#121417] hover:bg-[#cde0ec] cursor-pointer';
  const disabledClasses = 'bg-[#e8f1f7] text-[#7c8386] cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}
