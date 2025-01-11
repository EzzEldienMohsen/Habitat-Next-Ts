import { getProductById } from '@/actions/productsActions';
import Separator from '@/components/mainPageComponents/Separator';
import SpecialProducts from '@/components/mainPageComponents/SpecialProducts';
import Card from '@/components/singleProduct/Card';
import CareSingle from '@/components/singleProduct/CareSingle';
import TheSingleContent from '@/components/singleProduct/TheSingleContent';
import React from 'react';

const page: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = await params;
  const data = await getProductById(id);
  if (!data) {
    return <div>there is product with these number</div>;
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

export async function generateStaticParams() {
  // If you need dynamic `id` values:
  // Replace this with your logic to fetch or define the `id` values
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}
