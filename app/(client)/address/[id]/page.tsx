import React from 'react';
import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';

type Params = Promise<{ id: string }>;
const Page: React.FC<{ params: Params }> = async ({ params }) => {
  const id = (await params).id;

  return (
    <>
      <EditAddressComponent id={id} />
      <Separator />
    </>
  );
};

export default Page;
