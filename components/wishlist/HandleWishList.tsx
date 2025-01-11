'use client';

import {
  addToWishlist,
  getAllWishlistItems,
  removeFromWishlist,
} from '@/actions/WishListActions';
import { Product } from '@/assets/types';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HandleWishList: React.FC<{ data: Product }> = ({ data }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isAdded, setIsAdded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const isInWishlist = async () => {
      setLoading(true);
      try {
        const wishList = await getAllWishlistItems();
        const desiredItem = wishList.items.find(
          (i) => i.product_id === data.id
        );
        setIsAdded(!!desiredItem);
      } catch (error) {
        console.log(error);

        toast.error('Failed to load wishlist items');
      } finally {
        setLoading(false);
      }
    };
    isInWishlist();
  }, [data.id]);

  const HandleWishlistChange = async () => {
    setLoading(true);
    try {
      const wishList = await getAllWishlistItems();
      const desiredItem = wishList.items.find((i) => i.product_id === data.id);

      if (desiredItem) {
        const result = await removeFromWishlist(desiredItem.id);
        if (result.success) {
          setIsAdded(false);
          toast.error('Item removed from your wishlist');
        } else if (result.error) {
          toast.error(result.error[0].message);
        }
      } else {
        const result = await addToWishlist(data);
        if (result.success) {
          setIsAdded(true);
          toast.success('Item added to your wishlist');
        } else if (result.error) {
          toast.error(result.error[0].message);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error('Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="w-full flex justify-center items-center my-8">
      <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
    </div>
  ) : (
    <button
      aria-label="wish-list"
      className={`absolute btn-ghost bg-transparent top-0 right-0 mr-2 btn btn-circle ${
        isAdded ? 'text-[#ef436ee9]' : 'text-black'
      } text-3xl z-10`}
      onClick={HandleWishlistChange}
    >
      <FaHeart />
    </button>
  );
};

export default HandleWishList;
