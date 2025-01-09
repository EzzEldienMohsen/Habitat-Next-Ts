'use client';

import { deleteProfile } from '@/actions/addressAndProfileActions';
import React from 'react';
import { toast } from 'react-toastify';
import DeleteButton from '../formElements/DeleteButton';

interface Props {
  onProfileDeleted: () => void;
}

const DeleteProfileForm: React.FC<Props> = ({ onProfileDeleted }) => {
  const [state, formAction] = React.useActionState(deleteProfile, {
    success: false,
  });

  React.useEffect(() => {
    if (state?.success) {
      toast.success('Profile deleted successfully');
      onProfileDeleted(); // Trigger profile refresh
    }
  }, [state?.success]);

  return (
    
      <form action={formAction} className="w-full flex flex-col justify-center items-center gap-y-4">
        <DeleteButton name="Profile" />
      </form>
  );
};

export default DeleteProfileForm;
