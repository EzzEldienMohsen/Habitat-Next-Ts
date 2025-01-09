'use client';
import { ClientAddress } from '@/assets/types';
import React from 'react';
import { updateAddress } from '@/actions/addressAndProfileActions';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import FormElement from '../formElements/FormElement';
import SubmitButton from '../formElements/SubmitButton';
import HiddenIdElement from '../formElements/HiddenIdElement';

const EditAddressForm: React.FC<{ address: ClientAddress | undefined }> = ({
  address,
}) => {
  const [state, formAction] = React.useActionState(updateAddress, {
    error: [],
    success: false,
  });
  React.useEffect(() => {
    if (state.success) {
      toast.success('Edited the address successfully successfully!');
      redirect('/address');
    }
  }, [state.success]);
  return (
    <div className="flex flex-col px-4 gap-y-6 justify-center items-center my-4 w-full">
      <h1 className="font-man capitalize text-xl md:text-2xl lg:text-3xl font-light">
        Update Address
      </h1>
      <div className="flex flex-col justify-center items-start w-4/5 bg-[#f7f5eb] p-5 gap-y-4 rounded-md">
        <form
          action={formAction}
          className="w-full flex flex-col justify-center items-center gap-y-4"
        >
          <HiddenIdElement id={address?.id} />
          <FormElement
            name="address_name"
            type="text"
            defaultValue={address?.address_name}
            isError={!!state.error?.find((err) => err.field === 'address_name')}
            error={
              state.error?.find((err) => err.field === 'address_name')?.message
            }
          />
          <FormElement
            name="address_details"
            type="text"
            defaultValue={address?.address_details}
            isError={
              !!state.error?.find((err) => err.field === 'address_details')
            }
            error={
              state.error?.find((err) => err.field === 'address_details')
                ?.message
            }
          />

          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default EditAddressForm;
