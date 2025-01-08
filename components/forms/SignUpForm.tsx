'use client';

import { clientSignUp } from '@/actions/authActions';
import React from 'react';
import FormElement from '../formElements/FormElement';
import PasswordElement from '../formElements/PasswordElement';
import Link from 'next/link';
import SubmitButton from '../formElements/SubmitButton';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const SignUpForm = () => {
  const [state, formAction] = React.useActionState(clientSignUp, {
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
        Sign Up
      </h1>
      <div className="flex flex-col justify-center items-start w-4/5 bg-[#f7f5eb] p-5 gap-y-4 rounded-md">
        <form
          action={formAction}
          className="w-full flex flex-col justify-center items-center gap-y-4 "
        >
          <FormElement
            name="f_name"
            type="text"
            isError={!!state.error?.find((err) => err.field === 'f_name')}
            error={state.error?.find((err) => err.field === 'f_name')?.message}
          />
          <FormElement
            name="l_name"
            type="text"
            isError={!!state.error?.find((err) => err.field === 'l_name')}
            error={state.error?.find((err) => err.field === 'l_name')?.message}
          />
          <FormElement
            name="email"
            type="email"
            isError={!!state.error?.find((err) => err.field === 'email')}
            error={state.error?.find((err) => err.field === 'email')?.message}
          />
          <FormElement
            name="phone"
            type="text"
            isError={!!state.error?.find((err) => err.field === 'phone')}
            error={state.error?.find((err) => err.field === 'phone')?.message}
          />
          <PasswordElement
            name="password"
            type="password"
            isError={!!state.error?.find((err) => err.field === 'password')}
            error={
              state.error?.find((err) => err.field === 'password')?.message
            }
          />
          <PasswordElement
            name="confirmPassword"
            type="password"
            isError={
              !!state.error?.find((err) => err.field === 'confirmPassword')
            }
            error={
              state.error?.find((err) => err.field === 'confirmPassword')
                ?.message
            }
          />
          <SubmitButton />
        </form>
        <div className="flex gap-x-3 justify-start items-center">
          <p className="text-sm md:text-base lg:text-lg text-gray-700">
            Already have an account ?
          </p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
