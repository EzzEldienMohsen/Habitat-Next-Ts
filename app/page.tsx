import Hero from '@/components/mainPageComponents/Hero';
import Products from '@/components/mainPageComponents/Products';
import Separator from '@/components/mainPageComponents/Separator';
import SpecialProducts from '@/components/mainPageComponents/SpecialProducts';

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Separator />
      <SpecialProducts />
    </>
  );
}
