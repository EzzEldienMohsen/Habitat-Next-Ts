'use client';

import { getAllWishlistItems } from '@/actions/WishListActions';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const WishListButton = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [number, setNumber] = React.useState<number>(0);
  React.useEffect(() => {
    const getTotal = async () => {
      const data = await getAllWishlistItems();
      setNumber(data.totalItems ? data.totalItems : 0);
      setLoading(false);
    };
    getTotal();
  }, [number]);
  return loading ? (
    <div className="w-full flex justify-center items-center my-8">
      <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
    </div>
  ) : (
    <Link href="/wishlist" className="relative">
      <span className="absolute top-0 w-6 h-6 flex justify-center items-center -right-1 btn-circle bg-[#747bff] text-black font-man font-light text-xs">
        <span>{number}</span>
      </span>
      <FaHeart className="w-8 mt-1 h-8 text-[#222] font-thin" />
    </Link>
  );
};

export default WishListButton;
