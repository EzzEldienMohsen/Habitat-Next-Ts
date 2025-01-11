import EditAddressComponent from '@/components/addressComponents/EditAddressComponent';
import Separator from '@/components/mainPageComponents/Separator';
// import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';

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

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { id } = context.params as { id: string };
//   return {
//     props: {
//       params: { id },
//     },
//   };
// };

export default Page;
