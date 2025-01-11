import Link from 'next/link';
import React from 'react';
import logo from '@/app/icon.svg';
import Image from 'next/image';
import { headerLinks } from '@/assets';
import Menu from './Menu';
import LogOutComponent from './LogOutComponent';
import CartButton from './CartButton';
import WishListButton from './WishListButton';

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
        <CartButton />
        <WishListButton />
        <LogOutComponent style="w-8 mt-1 h-8 text-[#222] font-thin" />
      </div>
      {/* MOBILE MENU */}
      <Menu />
    </div>
  );
};

export default Header;
