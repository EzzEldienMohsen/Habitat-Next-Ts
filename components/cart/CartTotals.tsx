"use client"
import { clearCart } from '@/actions/CartActions';
import { formatPrice } from '@/utils';
import React from 'react';
import { toast } from 'react-toastify';

const CartTotals: React.FC<{
  totalPrice: number;
  taxes: number;
  subTotal: number;
  cartId:number
}> = ({ totalPrice, taxes, subTotal,cartId }) => {
    const handleClearCart = async ()=>{
        const result = await clearCart(cartId)
        if(result.success){
            toast.success("cart cleared successfully")
            window.location.reload();
        }
    }
  return (
    <div className="flex flex-col px-4 py-2 gap-3 my-4 bg-[#f7f5eb]">
      {/* SUB TOTAL */}
      <p className="border-b border-base-300 pb-2 flex justify-between font-man font-light text-sm lg:text-base">
        <span>Subtotal</span>
        <span>{formatPrice(subTotal)}</span>
      </p>

      {/* TAX */}
      <p className="border-b border-base-300 pb-2 flex justify-between text-sm lg:text-base">
        <span>Tax</span>
        <span className="font-medium">{formatPrice(taxes)}</span>
      </p>
      {/* ORDER TOTAL */}
      <p className="mt-4 pb-2 flex justify-between text-lg lg:text-xl">
        <span>Order Total</span>
        <span className="font-medium">{formatPrice(totalPrice)}</span>
      </p>
      <button
      onClick={handleClearCart}
      className=" btn btn-block my-2 flex justify-center shadow-xl border-[2px] items-center">
        Clear Cart
      </button>
    </div>
  );
};

export default CartTotals;
