'use client';
import { clientLogout } from '@/actions/authActions';
import { redirect } from 'next/navigation';
import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { revalidatePath } from 'next/cache';

const LogOutForm: React.FC<{ style: string }> = ({ style }) => {
  const [state, formAction] = React.useActionState(clientLogout, {
    success: '',
  });
  console.log(state.success, state);
  React.useEffect(() => {
    if (state?.success.length > 0) {
      toast.success(state.success);
      revalidatePath('/', 'layout');

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
