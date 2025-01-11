'use client';
import { clearWishlist, removeFromWishlist } from '@/actions/WishListActions';
import { WishlistItem } from '@/assets/types';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';

const WishListContent: React.FC<{ data: WishlistItem[] }> = ({ data }) => {
  const handleRemoveItem = async (id: number) => {
    const result = await removeFromWishlist(id);
    if (result.success) {
      toast.success('Item removed From Wishlist');
      window.location.reload();
    }
  };
  const handleClearWishlist = async () => {
    const result = await clearWishlist();
    if (result.success) {
      toast.success('Item removed From Wishlist');
      window.location.reload();
    }
  };
  return (
    <div className="flex flex-col my-4 px-4">
      {' '}
      <div className="flex flex-col justify-center items-center md:justify-evenly lg:items-start lg:justify-start md:flex md:flex-row md:flex-wrap md:gap-4 lg:gap-10">
        {' '}
        {data.map((prod) => (
          <div
            key={prod.id}
            className="relative w-80 px-4 lg:w-72 shadow-lg bg-[#f7f5eb] rounded-t-md flex flex-col my-4 md:my-0 justify-start items-start"
          >
            {' '}
            <img src={prod.img} alt={prod.cat} className="rounded-t-md" />{' '}
            <h2 className="text-[#1b1b1b] text-xl my-2 font-man font-light">
              {prod.name}
            </h2>{' '}
            <p className="text-[#1b1b1b] text-lg my-2 font-man font-light">
              {prod.type}
            </p>{' '}
            <p className="text-[#1b1b1b] text-lg my-2 font-man font-light">
              {prod.price}
            </p>{' '}
            <p className="text-[#1b1b1b] text-lg my-2 font-man font-light">
              {prod.cat}
            </p>{' '}
            <button
              className="btn bg-[#f7f5eb] text-[#1b1b1b] mb-2 mt-1 font-man btn-block"
              onClick={() => handleRemoveItem(prod.id)}
            >
              {' '}
              Remove From WishList{' '}
            </button>{' '}
            <Link
              href={`/products/${prod.id}`}
              className="btn btn-block my-2 flex justify-center shadow-xl border-[2px] items-center"
            >
              {' '}
              <p className="text-[#1b1b1b] text-lg font-man font-light">
                Go to product
              </p>{' '}
            </Link>{' '}
          </div>
        ))}{' '}
      </div>{' '}
      <button
        onClick={handleClearWishlist}
        className="btn btn-block my-4 flex justify-center shadow-xl border-[2px] items-center"
      >
        {' '}
        Clear WishList{' '}
      </button>{' '}
    </div>
  );
};
export default WishListContent;
