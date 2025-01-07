'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { sendMessages } from '@/actions/productsActions';
import FormElement from '@/components/formElements/FormElement';
import { toast } from 'react-toastify';

const Page = () => {
  const [state, formAction] = React.useActionState(sendMessages, {});
  const status = useFormStatus();

  // React effect to show toast messages
  React.useEffect(() => {
    if (!status.pending && Object.keys(state).length === 0) {
      toast.success('Message sent successfully!');
    }
  }, [status.pending, state.error]);

  return (
    <div className="flex flex-col px-4 gap-y-6 justify-center items-center mt-4 w-full">
      <h1 className="font-man capitalize text-xl md:text-2xl lg:text-3xl font-light">
        Contact Us
      </h1>
      <form
        action={formAction}
        className="w-4/5 bg-[#f7f5eb] flex flex-col justify-center items-center p-10 gap-y-4"
      >
        <FormElement
          name="name"
          type="text"
          isError={!!state.error?.find((err) => err.field === 'name')}
          error={state.error?.find((err) => err.field === 'name')?.message}
        />
        <FormElement
          name="phone"
          type="text"
          isError={!!state.error?.find((err) => err.field === 'phone')}
          error={state.error?.find((err) => err.field === 'phone')?.message}
        />
        <FormElement
          name="email"
          type="email"
          isError={!!state.error?.find((err) => err.field === 'email')}
          error={state.error?.find((err) => err.field === 'email')?.message}
        />
        <FormElement
          name="message"
          type="textarea"
          isError={!!state.error?.find((err) => err.field === 'message')}
          error={state.error?.find((err) => err.field === 'message')?.message}
        />

        <button
          disabled={status.pending}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          {status.pending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Page;
