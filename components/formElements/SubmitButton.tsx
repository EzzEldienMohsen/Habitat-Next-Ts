'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const status = useFormStatus();

  return (
    <button
      disabled={status.pending}
      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
    >
      {status.pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

export default SubmitButton;
