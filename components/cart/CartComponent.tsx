'use client';

import { getAllCartItems } from '@/actions/CartActions';
import { GetCartData } from '@/assets/types';
import React from 'react';
import CartItems from './CartItems';
import CartTotals from './CartTotals';

const CartComponent: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<GetCartData>({
    items: [],
    totalPrice: 0,
    totalItems: 0,
    taxes: 0,
    cartId:0,
    subTotal: 0,
    error: [],
  });

  React.useEffect(() => {
    const getTheData = async () => {
      const result = await getAllCartItems();
      setData(result);
      setLoading(false);
    };
    getTheData();
  }, []);

  return loading ? (
    <div className="w-full flex justify-center items-center my-8">
      <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
    </div>
  ) : data.totalItems === 0 ? (
    <div className="px-4 flex justify-center items-center h-96">
      <h1 className="text-xl md:text-2xl lg:text-5xl font-man font-light">
        Please Add Items To Cart
      </h1>
    </div>
  ) : (
    <>
      <CartItems items={data.items} />
      <CartTotals
        taxes={data.taxes}
        totalPrice={data.totalPrice}
        subTotal={data.subTotal}
        cartId={data.cartId}
      />
    </>
  );
};

export default CartComponent;
