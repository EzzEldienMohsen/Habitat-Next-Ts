import Link from 'next/link';
import React from 'react';
import logo from '@/app/icon.svg';
import Image from 'next/image';
import { headerLinks } from '@/assets';
import { LuLogIn } from 'react-icons/lu';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import Menu from './Menu';
const Header = () => {
  return (
    <div className="bg-[#f7f5eb] py-2 flex lg:justify-between items-center justify-between px-4 ">
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>
      {/* Middle NavBar */}
      <ul className="hidden lg:flex gap-4 justify-between items-center text-md text-[#222] text-xl font-man font-extralight capitalize">
        {headerLinks.map((li) => {
          return (
            <Link key={li} href={`/${li}`}>
              {li}
            </Link>
          );
        })}
      </ul>
      {/* Icons */}
      <div className="hidden lg:flex justify-between items-center text-[#222] text-2xl gap-6 font-man font-extralight">
        <LuLogIn className="w-8 mt-1 h-8 text-[#222] font-thin" />
        <Link href="/cart" className="relative">
          <span className="absolute top-0 w-6 h-6 flex justify-center items-center -right-1 btn-circle bg-[#747bff] text-black font-man font-light text-xs">
            <span>{0}</span>
          </span>
          <MdOutlineShoppingBag className="w-8 mt-1 h-8 text-[#222] font-thin" />
        </Link>
        <Link href="/wishList" className="relative">
          <span className="absolute top-0 w-6 h-6 flex justify-center items-center -right-1 btn-circle bg-[#747bff] text-black font-man font-light text-xs">
            <span>{0}</span>
          </span>
          <FaHeart className="w-8 h-8 text-[#222] font-thin mt-1" />
        </Link>
      </div>
      {/* MOBILE MENU */}
      <Menu />
    </div>
  );
};

export default Header;
