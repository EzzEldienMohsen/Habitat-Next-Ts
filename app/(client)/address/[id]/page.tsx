import React from 'react';
import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';

const Page: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = await params;
  if(!id){

  }
  return (
    <>
      <EditAddressComponent id={id} />
      <Separator />
    </>
  );
};

export default Page;
