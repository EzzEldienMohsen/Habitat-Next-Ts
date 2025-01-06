'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  categories: string[];
  selectedTab: string;
  setSelectedTab:
    | ((category: string) => void)
    | React.Dispatch<React.SetStateAction<string>>;
}

const CategoryTabs: React.FC<Props> = ({
  categories,
  selectedTab,
  setSelectedTab,
}) => {
  const handleTabClick = (category: string) => {
    if (typeof setSelectedTab === 'function') {
      setSelectedTab(category);
    }
  };

  return (
    <ul className="flex justify-between gap-8 items-center font-man capitalize text-md md:text-lg lg:text-2xl my-3">
      {categories.map((category) => (
        <li key={category}>
          <button onClick={() => handleTabClick(category)}>{category}</button>
          {category === selectedTab && (
            <motion.div
              className="underline h-[3px] bg-[darkblue]"
              layoutId="underline"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryTabs;
