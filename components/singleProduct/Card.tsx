'use client';

import { Product } from '@/assets/types';
import AmountGeneration from '@/utils/AmountGeneration';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

interface Props {
  data: Product;
}

const Card: React.FC<Props> = ({ data }) => {
  const [amount, setAmount] = React.useState<number>(1);
  const handleAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <div className="flex px-4 flex-col md:justify-between md:gap-10 lg:gap-20 md:flex-row-reverse relative">
      <div
        className={`absolute btn-ghost bg-transparent top-0 right-4 border-0 btn btn-circle text-3xl`}
      >
        <FaHeart />
      </div>
      <img
        src={data.img}
        alt={data.name}
        className="mb-4 md:mb-0 lg:w-10/12 rounded-t-xl"
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
          className="select  select-md select-bordered mb-4 font-man"
          value={amount}
          onChange={handleAmount}
        >
          <AmountGeneration count={10} />
        </select>
        <button className="btn bg-[#f7f5eb] text-[#1b1b1b] mb-4 font-man btn-block">
          Add to bag
        </button>
      </div>
    </div>
  );
};

export default Card;
