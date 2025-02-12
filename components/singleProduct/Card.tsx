'use client';

import { addToCart } from '@/actions/CartActions';
import { Product } from '@/assets/types';
import AmountGeneration from '@/utils/AmountGeneration';
import React from 'react';
import { toast } from 'react-toastify';
import HandleWishList from '../wishlist/HandleWishList';
interface Props {
  data: Product;
}

const Card: React.FC<Props> = ({ data }) => {
  const [amount, setAmount] = React.useState<number>(1);

  // Handle amount selection
  const handleAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(e.target.value, 10));
  };

  // Handle adding item to cart
  const handleAddToCart = async () => {
    const cartItem = { ...data, amount };
    try {
      const result = await addToCart(cartItem);
      if (result.success) {
        toast.success('Item added to cart successfully');
      } else {
        console.error('Failed to add item to cart:', result.error);
        toast.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error while adding item to cart:', error);
      toast.error('Error while adding item to cart');
    }
  };

  return (
    <div className="flex px-4 flex-col md:justify-between md:gap-10 lg:gap-20 md:flex-row-reverse relative">
      <HandleWishList data={data} />
      <img
        src={data.img}
        alt={data.name}
        className="mb-4 md:mb-0 lg:w-full rounded-t-xl"
      />
      <div className="flex flex-col md:w-2/5 lg:w-auto">
        <h1 className="text-xl md:text-2xl lg:text-4xl mb-4 font-man font-semibold text-[#1b1b1b]">
          {data.name}
        </h1>
        <p className="text-md md:text-lg lg:text-xl mb-4 font-man font-normal text-[#1b1b1]">
          {data.type}
        </p>
        <p className="text-md md:text-lg lg:text-xl mb-4 font-man font-normal text-[#1b1b1]">
          {data.cat}
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mb-4 font-man font-bold text-[#1b1b1]">
          {data.price}
        </p>
        <p className="text-md md:text-lg lg:text-xl mb-4 font-man font-normal text-[#1b1b1]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          fugiat architecto non recusandae maiores odio quidem, sed ad sequi
          amet vel pariatur culpa. Quibusdam voluptates debitis quaerat,
          reprehenderit quod fuga.
        </p>
        <select
          aria-label="Select Amount"
          id="amount"
          name="amount"
          className="select select-md select-bordered mb-4 font-man"
          value={amount}
          onChange={handleAmount}
        >
          <AmountGeneration count={10} />
        </select>
        <button
          className="btn bg-[#f7f5eb] text-[#1b1b1b] mb-4 font-man btn-block"
          onClick={handleAddToCart}
        >
          Add to bag
        </button>
      </div>
    </div>
  );
};

export default Card;
