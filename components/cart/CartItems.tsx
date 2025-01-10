'use client';
import { removeFromCart } from '@/actions/CartActions';
import { CartProduct } from '@/assets/types';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartItems: React.FC<{ items: CartProduct[] }> = ({ items }) => {
  const handleRemoveItem = async (id: number) => {
    const result = await removeFromCart(id);
    if (result.success) {
      toast.success('product removed successfully from your cart');
      window.location.reload();
    }
  };
  return (
    <div className="my-4 px-4 flex flex-col justify-center items-center md:justify-evenly lg:justify-start md:flex md:flex-row md:flex-wrap md:gap-4 lg:gap-x-4 lg:gap-y-8">
      {items.map((prod) => {
        return (
          <div key={prod.id} className="relative w-80 lg:w-[23vw] px-4 shadow-lg bg-[#f7f5eb] rounded-t-md flex flex-col my-4 md:my-0 justify-start items-start"
>
            <div
              className={`absolute btn-ghost bg-transparent top-0 right-0 btn btn-circle  text-3xl`}
            >
              <FaHeart />
            </div>
            <img src={prod.img} alt={prod.cat} className=" rounded-t-md" />
            <Link
              href={`/products/${prod.product_id}`}
              className="flex justify-between items-center w-full"
            >
              <div className="flex justify-between items-center w-full mt-1 ">
                <p className="text-[#1b1b1b] text-lg font-man font-light">
                  Name
                </p>
                <p className="text-[#1b1b1b] text-lg font-man font-light">
                  {prod.name}
                </p>
              </div>
            </Link>
            <div className="flex justify-between items-center w-full mt-1 ">
              <p className="text-[#1b1b1b] text-lg font-man font-light">Type</p>
              <p className="text-[#1b1b1b] text-lg font-man font-light">
                {prod.type}
              </p>
            </div>
            <div className="flex justify-between items-center w-full mt-1 ">
              <p className="text-[#1b1b1b] text-lg font-man font-light">
                Category
              </p>
              <p className="text-[#1b1b1b] text-lg my-2 font-man font-light">
                {prod.cat}
              </p>
            </div>
            <div className="flex justify-between items-center w-full mt-1 ">
              <p className="text-[#1b1b1b] text-lg font-man font-light">
                Amount:
              </p>
              <p className="text-[#1b1b1b] text-lg  font-man font-light">
                {prod.amount}
              </p>
            </div>
            <div className="flex justify-between items-center w-full mt-1 ">
              <p className="text-[#1b1b1b] text-lg font-man font-light">
                unit Price:
              </p>
              <p className="text-[#1b1b1b] text-lg my-2 font-man font-light">
                {prod.price}
              </p>
            </div>
            <div className="flex justify-between items-center w-full mt-1 ">
              <p className="text-[#1b1b1b] text-lg font-man font-light">
                Total Price:
              </p>
              <p className="text-[#1b1b1b] text-lg my-2 font-man font-light">
                {prod.price * prod.amount}
              </p>
            </div>
            <button
              onClick={() => {
                handleRemoveItem(prod.id);
              }}
              className="btn bg-[#f7f5eb] text-[#1b1b1b] mb-2 mt-1 font-man btn-block"
            >
              Remove From bag
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
