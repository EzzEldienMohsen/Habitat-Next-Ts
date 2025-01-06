import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const SocialColumn: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="capitalize font-man text-[#1b1b1b]">follow us</h2>
      <ul className="font-man font-light text-[#1b1b1b] ">
        <li className="my-2 flex capitalize justify-between items-center">
          <FaFacebookF className="mr-2" />
          facebook
        </li>
        <li className="my-2 flex capitalize justify-between items-center">
          <FaInstagram className="mr-2" />
          instagram
        </li>
        <li className="my-2 flex capitalize justify-between items-center">
          <FaXTwitter className="mr-2 " />
          <span className="mr-6">twitter</span>
        </li>
      </ul>
    </div>
  );
};

export default SocialColumn;
