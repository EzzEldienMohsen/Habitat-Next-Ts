import React from 'react';
import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';

const Page: React.FC<{ params: { id: string } }> = async ({ params }) => {
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
