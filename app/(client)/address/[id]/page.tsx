import React from 'react';
import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';
import { Params } from 'next/dist/server/request/params';

const Page: React.FC<{ params: Params }> = async ({ params }) => {
  let id;
  try {
    id = await params.id;
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <EditAddressComponent id={id} />
      <Separator />
    </>
  );
};

export default Page;
