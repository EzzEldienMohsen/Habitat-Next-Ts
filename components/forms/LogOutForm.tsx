'use client';
import { clientLogout } from '@/actions/authActions';
import { redirect } from 'next/navigation';
import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { toast } from 'react-toastify';

const LogOutForm: React.FC<{ style: string }> = ({ style }) => {
  const [state, formAction] = React.useActionState(clientLogout, {
    success: false,
  });
  React.useEffect(() => {
    if (state.success) {
      toast.success('Signed out successfully');

      redirect('/');
    }
  }, [state.success]);

  return (
    <form action={formAction}>
      <button aria-label="button">
        <LuLogOut className={style} />
      </button>
    </form>
  );
};

export default LogOutForm;
