import { getProductById } from '@/actions/productsActions';
import Separator from '@/components/mainPageComponents/Separator';
import SpecialProducts from '@/components/mainPageComponents/SpecialProducts';
import Card from '@/components/singleProduct/Card';
import CareSingle from '@/components/singleProduct/CareSingle';
import TheSingleContent from '@/components/singleProduct/TheSingleContent';
import { Params } from 'next/dist/server/request/params';
import React from 'react';

const page: React.FC<{ params: Params }> = async ({ params }) => {
  const { id } = await params;
  let data;
  if (!id) {
    return (
      <div className="w-full flex justify-center items-center my-8">
        {' '}
        <span className="text-red-500">
          Error: No product ID found in params
        </span>{' '}
      </div>
    );
  } else {
    const productId = Array.isArray(id) ? id[0] : id;
    data = await getProductById(productId);
  }
  if (!data) {
    return (
      <div className="w-full flex justify-center items-center my-8">
        {' '}
        <span className="text-red-500">
          Error: No product found with the given ID
        </span>{' '}
      </div>
    );
  }

  return (
    <div className="flex flex-col my-8">
      {/* CARD */}
      <Card data={data} />
      {/* SECTION */}
      <CareSingle />
      {/* THE LOREM CONTENT */}
      <TheSingleContent />
      {/* Separator */}
      <Separator />
      {/* Special Products */}
      <SpecialProducts />
    </div>
  );
};

export default page;
