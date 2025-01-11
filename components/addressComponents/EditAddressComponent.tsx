'use client';

import { getAddressById } from '@/actions/addressAndProfileActions';
import { ClientAddress } from '@/assets/types';
import React from 'react';
import EditAddressForm from '../forms/EditAddressForm';

interface EditAddressComponentProps {
  id?: string | string[];
}

const EditAddressComponent: React.FC<EditAddressComponentProps> = ({ id }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [address, setAddress] = React.useState<ClientAddress | undefined>();

  React.useEffect(() => {
    const getAddresses = async () => {
      try {
        const addressId = Array.isArray(id) ? id[0] : id;

        if (addressId) {
          const data = await getAddressById(addressId);
          if (data.address) {
            setAddress(data.address);
          }
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        throw new Error('Could not get data from database');
      } finally {
        setLoading(false);
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
