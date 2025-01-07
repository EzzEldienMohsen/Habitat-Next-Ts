'use client';

import { sendMessages } from '@/actions/productsActions';
import React from 'react';
import { toast } from 'react-toastify';
import FormElement from '../formElements/FormElement';
import SubmitButton from '../formElements/SubmitButton';

const ContactForm = () => {
  const [state, formAction] = React.useActionState(sendMessages, {});

  // React effect to show toast messages
  React.useEffect(() => {
    if (state.success) {
      toast.success('Message sent successfully!');
    } else if (state.error) {
      toast.error('Failed to send message. Please fix the errors.');
    }
  }, [state]);

  return (
    <div className="flex flex-col px-4 gap-y-6 justify-center items-center my-4 w-full">
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

        <SubmitButton />
      </form>
    </div>
  );
};

export default ContactForm;
