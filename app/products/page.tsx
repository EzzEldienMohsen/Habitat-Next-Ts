'use client';

import React from 'react';
import { Products as TheProductsType } from '@/assets/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPaginatedProducts } from '@/actions/productsActions';
import CategoryTabs from '@/components/mainPageComponents/CategoryTabs';
import { productsTypes } from '@/assets';
import ProductList from '@/components/mainPageComponents/ProductsList';
import Pagination from '@/components/products/Pagination';

const Page: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState<string>('all');
  const [products, setProducts] = React.useState<TheProductsType>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const searchParams = useSearchParams();
  const limit = 16;

  // Fetch Products
  const fetchProducts = async (page: number, category: string) => {
    setLoading(true);
    const offset = (page - 1) * limit;

    try {
      const data =
        category === 'all' || category === ''
          ? await getPaginatedProducts(limit, offset, '')
          : await getPaginatedProducts(limit, offset, category);

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update products when URL or tab changes
  React.useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    setCurrentPage(page);

    fetchProducts(page, selectedTab);
  }, [selectedTab, searchParams]);

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
          <div className="w-full flex justify-center items-center my-8">
            <span className="loading loading-spinner loading-lg text-[darkblue]"></span>
          </div>
        ) : products.length > 0 ? (
          <>
            <ProductList products={products} />
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <p className="text-center">No products found for this category.</p>
        )}
      </React.Suspense>
    </>
  );
};

export default Page;
