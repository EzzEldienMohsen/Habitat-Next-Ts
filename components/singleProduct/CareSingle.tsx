'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { careData, detailsData, infoBtn, inst } from '@/assets';

const CareSingle = () => {
  const [isSelected, setIsSelected] = React.useState(infoBtn[0]);
  const [TheData, setTheData] = React.useState(detailsData);

  const toggleTheData = (btn: string) => {
    if (btn === 'details') {
      setTheData(() => detailsData);
    } else if (btn === 'care & maintenance') {
      setTheData(() => careData);
    }
  };

  return (
    <div className="flex px-4 flex-col lg:flex-row lg:gap-5">
      <div className="flex flex-col w-full lg:w-4/5">
        <div className="flex gap-6 border-b-2 border-[#a7a3a32f] w-full">
          {infoBtn.map((btn) => (
            <li key={btn} className="list-none">
              <h2
                onClick={() => {
                  toggleTheData(btn);
                  setIsSelected(btn);
                }}
                className={`text-[#1b1b1bc0] text-lg md:text-xl capitalize cursor-pointer ${
                  btn === isSelected ? 'font-bold' : ''
                }`}
              >
                {btn}
              </h2>
              {btn === isSelected ? (
                <motion.div
                  className="underline h-[3px] bg-[#1b1b1b]"
                  layoutId="underline"
                />
              ) : null}
            </li>
          ))}
        </div>
        <AnimatePresence>
          {TheData.map((d) => (
            <motion.div
              key={d.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-start mt-3"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`${d.para2 ? 'w-full lg:w-1/2' : 'w-full'}`}
              >
                <p className="text-lg mb-3 font-man font-light text-[#1b1b1b]">
                  {d?.para1}
                </p>
              </motion.div>
              {d.para2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full lg:w-1/2 mt-0 lg:mt-0 ml-0 lg:ml-3"
                >
                  <p className="text-lg md:text-xl font-man font-light text-[#1b1b1b]">
                    {d?.para2}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex flex-col w-full lg:w-auto">
        {inst.map((i) => (
          <div key={i.id} className="flex flex-col my-2">
            <h2 className="font-man font-bold text-2xl md:text-xl lg:text-lg">
              {i.title}
            </h2>
            <p className="font-man font-light text-xl md:text-lg lg:text-md">
              {i.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareSingle;
