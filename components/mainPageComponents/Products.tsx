'use client';
import React from 'react';
import { productsTypes } from '@/assets';
import { getMainProducts } from '@/actions/productsActions';
import { Products as TheProductsType } from '@/assets/types';
import CategoryTabs from './CategoryTabs';
import ProductList from './ProductsList';

const Products: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<string>('all');
  const [products, setProducts] = React.useState<TheProductsType>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // Fetch Products Initially or on Category Change
  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data =
          selectedTab === 'all' || selectedTab === ''
            ? await getMainProducts()
            : await getMainProducts(8, 0, selectedTab);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedTab]);

  return (
    <>
      <div className="flex flex-col px-4 justify-center items-center mt-4">
        <h1 className="font-man capitalize text-xl md:text-2xl lg:text-3xl font-light">
          products
        </h1>
        <CategoryTabs
  categories={productsTypes.map((type) => type.toLowerCase())} 
  selectedTab={selectedTab}
  setSelectedTab={setSelectedTab}
/>
      </div>
      <React.Suspense
        fallback={
          <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
        }
      >
        {loading ? (
          <div className="w-full flex justify-center items-center my-8"> <span className="loading loading-spinner loading-lg text-[darkblue]"></span></div>
        ) : products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <p className="text-center">No products found for this category.</p>
        )}
      </React.Suspense>
    </>
  );
};

export default Products;
