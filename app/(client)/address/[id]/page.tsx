import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';
import React from 'react';

const page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  return (
    <>
      <EditAddressComponent id={id} />
      <Separator />
    </>
  );
};

export default page;
