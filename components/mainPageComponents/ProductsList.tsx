'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Products } from '@/assets/types';
import HandleWishList from '../wishlist/HandleWishList';

interface Props {
  products: Products;
}
const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="my-4 px-4 flex flex-col justify-center items-center md:justify-evenly lg:justify-start md:flex md:flex-row md:flex-wrap md:gap-4 lg:gap-x-4 lg:gap-y-8">
      {products.map((prod) => (
        <AnimatePresence key={prod.id} mode="wait">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-80 lg:w-[23vw] px-4 shadow-lg bg-[#f7f5eb] rounded-t-md flex flex-col my-4 md:my-0 justify-start items-start"
          >
            <HandleWishList data={prod} />
            <div className="relative w-full h-40">
              <Image
                src={prod.img}
                alt={prod.cat}
                fill
                className="rounded-t-md object-fill"
              />
            </div>
            <h2 className="text-[#1b1b1b] text-xl my-2 font-man font-light">
              {prod.name}
            </h2>
            <p className="text-[#1b1b1b] text-md my-2 font-man font-light">
              {prod.type}
            </p>
            <p className="text-[#1b1b1b] text-md my-2 font-man font-light">
              {prod.price}
            </p>
            <p className="text-[#1b1b1b] text-md my-2 font-man font-light">
              {prod.cat}
            </p>
            <Link
              href={`/products/${prod.id}`}
              className="btn btn-block my-2 flex justify-center shadow-xl border-[2px] items-center"
            >
              <p className="text-[#1b1b1b] text-md font-man font-light">
                Go to product
              </p>
            </Link>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductList;
