import React from 'react';
import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';
import { Params } from 'next/dist/server/request/params';

interface PageProps {
  params: Params;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const id = params.id;

  if (!id) {
    console.error('No ID found in params');
    return (
      <div className="w-full flex justify-center items-center my-8">
        <span className="text-red-500">Error: No ID found in params</span>
      </div>
    );
  }

  return (
    <>
      <EditAddressComponent id={id} />
      <Separator />
    </>
  );
};

export default Page;
