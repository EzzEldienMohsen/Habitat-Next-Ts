'use client';
import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

interface Props {
  name: string;
  type: string;
  isError?: boolean;
  error?: string; // To show error messages
}

const PasswordElement: React.FC<Props> = ({ name, type, isError, error }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center items-start gap-y-2 w-full">
      <label
        htmlFor={name}
        className="capitalize font-man text-lg md:text-xl lg:text-2xl font-semibold"
      >
        {name}
      </label>
      <div className="w-full relative">
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          placeholder={`Please insert your ${name}`}
          className={`rounded-md w-full p-2 shadow-md bg-white font-man text-md md:text-xl  border ${
            isError ? 'border-[red]' : 'border-black'
          }`}
        />
        <button
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
        </button>
      </div>
      {isError && error && (
        <p className="text-red-500 text-sm md:text-base">{error}</p>
      )}
    </div>
  );
};

export default PasswordElement;
