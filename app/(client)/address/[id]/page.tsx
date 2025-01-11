import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';
import React from 'react';

// Correct type definition for PageProps
interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  return (
    <>
      <EditAddressComponent id={id} />
      <Separator />
    </>
  );
};

export default Page;
