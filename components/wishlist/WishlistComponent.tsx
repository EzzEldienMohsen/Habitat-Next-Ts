'use client';

import { getAllWishlistItems } from '@/actions/WishListActions';
import { GetWishlistData } from '@/assets/types';
import React from 'react';
import WishListContent from './WishListContent';

const WishlistComponent = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<GetWishlistData>({
    items: [],
    totalItems: 0,
    error: [],
  });

  React.useEffect(() => {
    const getTheData = async () => {
      const result = await getAllWishlistItems();
      setData(result);
      setLoading(false);
    };
    getTheData();
  }, []);

  return loading ? (
    <div className="w-full flex justify-center items-center my-8">
      <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
    </div>
  ) : data.totalItems > 0 ? (
    <>
      <WishListContent data={data.items} />
    </>
  ) : (
    <div className="px-4 flex justify-center items-center h-96">
      <h1 className="text-xl md:text-2xl lg:text-5xl font-man font-light">
        Please Add Items To Wishlist
      </h1>
    </div>
  );
};

export default WishlistComponent;
