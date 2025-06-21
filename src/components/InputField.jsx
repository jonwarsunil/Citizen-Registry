import React from 'react';

const InputField = ({ name, value, onChange, placeholder, error = '', className = '', type = 'text' }) => {
  return (
    <div className='w-full'>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded text-[#111518] 
          focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] 
          h-12 placeholder:text-[#60768a] p-[15px] text-base font-normal leading-normal
          ${className} ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default InputField;
