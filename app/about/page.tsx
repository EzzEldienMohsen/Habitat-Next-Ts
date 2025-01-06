import SecondHero from '@/components/aboutComponent/SecondHero';
import Hero from '@/components/mainPageComponents/Hero';
import Separator from '@/components/mainPageComponents/Separator';
import React from 'react';

const page: React.FC = () => {
  return (
    <>
      <Hero />
      <Separator />
      <SecondHero />
    </>
  );
};

export default page;
