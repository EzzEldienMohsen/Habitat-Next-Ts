import { ClientAddress } from '@/assets/types';
import Link from 'next/link';
import React from 'react';
import { GrMapLocation } from 'react-icons/gr';
import DeleteAddressForm from '../forms/DeleteAddressForm';

const AddressList: React.FC<{ address: ClientAddress[] }> = ({ address }) => {
  return (
    <div className="my-16 px-4 w-full  relative">
      <Link
        href="/address/create-address"
        className="btn bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex justify-center items-center absolute top-0 right-0"
      >
        Create an address
      </Link>
      <div className="w-full mt-24 mb-4 flex flex-col justify-center items-center md:justify-evenly lg:justify-start md:flex md:flex-row md:flex-wrap md:gap-4 lg:gap-x-4 lg:gap-y-8">
        {address.map((ad) => {
          return (
            <div
              key={ad.id}
              className="w-80 lg:w-[20vw] px-2 shadow-lg bg-[#f7f5eb] rounded-t-md flex flex-col my-4 md:my-0 py-5 justify-center items-center"
            >
              <GrMapLocation className="text-blue-500 w-8 h-8" />
              <p className="text-[#1b1b1b] text-xl my-2 font-man font-light">
                {ad.address_name}
              </p>
              <p className="text-[#1b1b1b] text-md my-2 font-man font-light">
                {ad.address_details}
              </p>
              <div className="w-full flex flex-col justify-center items-center">
                <DeleteAddressForm id={ad.id} />
                <Link
                  href="edit-address"
                  className="btn bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex justify-center items-center capitalize"
                >
                  Edit Address
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddressList;
