import React from 'react';
import Link from 'next/link';
import { clientLinks } from '@/assets';

const ClientHeader = () => {
  return (
    <div className="w-full flex justify-center items-center bg-[#e2e0d4] p-4">
      <ul className="flex justify-center items-center gap-x-5 text-md text-[#222] text-xl font-man font-extralight capitalize">
        {clientLinks.map((li) => {
          return (
            <Link key={li} href={`/${li}`}>
              {li}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientHeader;
