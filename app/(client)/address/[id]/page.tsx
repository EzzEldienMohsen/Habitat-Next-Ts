import React from 'react';
import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <EditAddressComponent id={id} />
      <Separator />
    </>
  );
};

export default Page;


