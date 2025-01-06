import { getSpecialProducts } from '@/actions/productsActions';
import React from 'react';
import ProductList from './ProductsList';

const SpecialProducts: React.FC = () => {
  const data = React.use(getSpecialProducts());
  return (
    <React.Suspense
      fallback={
        <div className="w-full flex justify-center items-center my-8">
          <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
        </div>
      }
    >
      <ProductList products={data} />
    </React.Suspense>
  );
};

export default SpecialProducts;
