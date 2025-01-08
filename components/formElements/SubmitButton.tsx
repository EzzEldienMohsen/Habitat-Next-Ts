'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const status = useFormStatus();

  return (
    <button
      disabled={status.pending}
      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex justify-center items-center"
    >
      {status.pending ? (
        <span className="loading loading-spinner loading-lg text-blue-300"></span>
      ) : (
        'Submit'
      )}
    </button>
  );
};

export default SubmitButton;
