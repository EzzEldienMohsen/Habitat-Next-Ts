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

export async function generateStaticParams() {
  // If you need dynamic `id` values:
  // Replace this with your logic to fetch or define the `id` values
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
