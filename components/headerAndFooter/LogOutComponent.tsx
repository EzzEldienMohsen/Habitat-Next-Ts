import React from 'react';
import LogOutForm from '../forms/LogOutForm';
import { LuLogIn } from 'react-icons/lu';
import Link from 'next/link';
import { checkAuth } from '@/actions/authActions';

const LogOutComponent: React.FC<{ style: string }> = async ({ style }) => {
  const { isSignedIn } = await checkAuth();
  return (
    <>
      {isSignedIn ? (
        <LogOutForm style={style} />
      ) : (
        <Link href={'/login'}>
          <LuLogIn className={style} />
        </Link>
      )}
    </>
  );
};

export default LogOutComponent;
