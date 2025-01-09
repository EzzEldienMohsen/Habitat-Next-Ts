'use client';

import { deleteAddress } from '@/actions/addressAndProfileActions';
import React from 'react';
import { toast } from 'react-toastify';
import HiddenIdElement from '../formElements/HiddenIdElement';
import DeleteButton from '../formElements/DeleteButton';

const DeleteAddressForm: React.FC<{ id: number }> = ({ id }) => {
  const [state, formAction] = React.useActionState(deleteAddress, {
    success: false,
  });

  React.useEffect(() => {
    if (state.success) {
      toast.success('Address deleted successfully');
       window.location.reload();
    } 
  }, [state.success]);

  return (
    <form action={formAction}>
      <HiddenIdElement id={id} />
      <DeleteButton name="address" />
    </form>
  );
};

export default DeleteAddressForm;
