'use client';

import { getAllAddresses } from '@/actions/addressAndProfileActions';
import { ClientAddress } from '@/assets/types';
import Link from 'next/link';
import React from 'react';
const AddressList = React.lazy(() => import('./AddressList'));
const AddressDisplayComponent = () => {
  const [address, setAddress] = React.useState<ClientAddress[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const getAddresses = async () => {
      try {
        const data = await getAllAddresses();
        setAddress(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        throw new Error('could not get data from db');
      }
    };
    getAddresses();
  }, []);

  return (
    <div className="flex flex-col px-4 justify-center items-center mt-4">
      <h1 className="font-man capitalize text-xl md:text-2xl lg:text-3xl font-light">
        Address
      </h1>
      {loading ? (
        <div className="w-full flex justify-center items-center my-8">
          <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
        </div>
      ) : address.length === 0 ? (
        <div className="w-full my-4 p-4 rounded-md flex flex-col justify-center items-center gap-y-4">
          <p className="text-center font-man capitalize text-md md:text-xl lg:text-2xl font-light">
            please add some addresses to be able to see them
          </p>
          <Link
            href="/address/create-address"
            className="btn bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex justify-center items-center"
          >
            Create an address
          </Link>
        </div>
      ) : (
        <React.Suspense
          fallback={
            <div className="w-full flex justify-center items-center my-8">
              <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
            </div>
          }
        >
          <AddressList address={address} />
        </React.Suspense>
      )}
    </div>
  );
};

export default AddressDisplayComponent;
