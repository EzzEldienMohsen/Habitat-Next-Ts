'use client';

import { getAddressById } from '@/actions/addressAndProfileActions';
import { ClientAddress } from '@/assets/types';
import React from 'react';
import EditAddressForm from '../forms/EditAddressForm';

const EditAddressComponent: React.FC<{ id: string }> = ({ id }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [address, setAddress] = React.useState<ClientAddress>();
  React.useEffect(() => {
    const getAddresses = async () => {
      try {
        const data = await getAddressById(id);
        if (data.address) {
          setAddress(data.address);
          setLoading(false);
        }
      } catch (error) {
                console.log(error);

        throw new Error('could not get data from db');
      }
    };
    getAddresses();
  }, [id]);

  return loading ? (
    <div className="w-full flex justify-center items-center my-8">
      <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
    </div>
  ) : (
    <React.Suspense
      fallback={
        <div className="w-full flex justify-center items-center my-8">
          <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
        </div>
      }
    >
      <EditAddressForm address={address} />
    </React.Suspense>
  );
};

export default EditAddressComponent;
