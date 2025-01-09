'use client';

import { updateProfile } from '@/actions/addressAndProfileActions';
import { ClientUser } from '@/assets/types';
import React from 'react';
import { toast } from 'react-toastify';
import FormElement from '../formElements/FormElement';
import SubmitButton from '../formElements/SubmitButton';
import DateElement from '../formElements/DateElement';

const UpdateProfileForm: React.FC<{ profile: ClientUser | undefined }> = ({
  profile,
}) => {
  const [state, formAction] = React.useActionState(updateProfile, {
    error: [],
    success: false,
  });

  React.useEffect(() => {
    if (state.success) {
      toast.success('Edited the profile successfully!');
             window.location.reload();

    } 
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="w-full flex flex-col justify-center items-center gap-y-4"
    >
      <FormElement
        name="f_name"
        type="text"
        defaultValue={profile?.f_name}
        isError={!!state.error?.find((err) => err.field === 'f_name')}
        error={state.error?.find((err) => err.field === 'f_name')?.message}
      />
      <FormElement
        name="l_name"
        type="text"
        defaultValue={profile?.l_name}
        isError={!!state.error?.find((err) => err.field === 'l_name')}
        error={state.error?.find((err) => err.field === 'l_name')?.message}
      />
      <FormElement
        name="email"
        type="email"
        defaultValue={profile?.email}
        isError={!!state.error?.find((err) => err.field === 'email')}
        error={state.error?.find((err) => err.field === 'email')?.message}
      />
      <FormElement
        name="phone"
        type="tel"
        defaultValue={profile?.phone}
        isError={!!state.error?.find((err) => err.field === 'phone')}
        error={state.error?.find((err) => err.field === 'phone')?.message}
      />
      <FormElement
        name="gender"
        type="text"
        defaultValue={profile?.gender}
        isError={!!state.error?.find((err) => err.field === 'gender')}
        error={state.error?.find((err) => err.field === 'gender')?.message}
      />
      <FormElement
        name="nationality"
        type="text"
        defaultValue={profile?.nationality}
        isError={!!state.error?.find((err) => err.field === 'nationality')}
        error={state.error?.find((err) => err.field === 'nationality')?.message}
      />
      <DateElement
        name="date_of_birth"
        defaultValue={profile?.date_of_birth}
        isError={!!state.error?.find((err) => err.field === 'date_of_birth')}
        error={
          state.error?.find((err) => err.field === 'date_of_birth')?.message
        }
      />
      <SubmitButton />
    </form>
  );
};

export default UpdateProfileForm;
