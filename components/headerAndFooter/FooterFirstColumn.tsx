import React from 'react';
import logo from '@/app/icon.svg';
import Link from 'next/link';
import Image from 'next/image';

const FooterFirstColumn = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-4 md:gap-6 lg:w-2/5">
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>
      <p className="font-man text-md md:text-lg lg:text-xl">
        Join our newsletter for deals, new drops and inspiration sent straight
        to your inbox.
      </p>
    </div>
  );
};

export default FooterFirstColumn;
