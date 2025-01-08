'use client';

import { clientLogin } from '@/actions/authActions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import SubmitButton from '../formElements/SubmitButton';
import PasswordElement from '../formElements/PasswordElement';
import FormElement from '../formElements/FormElement';

const LoginForm: React.FC = () => {
  const [state, formAction] = React.useActionState(clientLogin, {
    error: [],
    success: false,
    token: undefined,
  });

  React.useEffect(() => {
    if (state.token) {
      toast.success('Signed up successfully!');
      redirect('/');
    }
  }, [state.token]);
  return (
    <div className="flex flex-col px-4 gap-y-6 justify-center items-center my-4 w-full">
      <h1 className="font-man capitalize text-xl md:text-2xl lg:text-3xl font-light">
        Log In
      </h1>
      <div className="flex flex-col justify-center items-start w-4/5 bg-[#f7f5eb] p-5 gap-y-4 rounded-md">
        <form
          action={formAction}
          className="w-full flex flex-col justify-center items-center "
        >
          <FormElement
            name="email"
            type="email"
            isError={!!state.error?.find((err) => err.field === 'email')}
            error={state.error?.find((err) => err.field === 'email')?.message}
          />

          <PasswordElement
            name="password"
            type="password"
            isError={!!state.error?.find((err) => err.field === 'password')}
            error={
              state.error?.find((err) => err.field === 'password')?.message
            }
          />

          <SubmitButton />
        </form>
        <div className="flex gap-x-3 justify-start items-center">
          <p className="text-sm md:text-base lg:text-lg text-gray-700">
            Create an account ?
          </p>
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
