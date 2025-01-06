import React from 'react';
import { FooterColumn } from '../../assets/types';

interface Props {
  footerColumn: FooterColumn;
}
const FooterLinks: React.FC<Props> = ({ footerColumn }) => {
  return (
    <div
      className={`flex flex-col gap-4 ${
        footerColumn.title == 'Address' ? 'w-1/5' : ''
      }`}
    >
      <h2 className="capitalize font-man text-[#1b1b1b]">
        {footerColumn.title}
      </h2>
      <ul className="font-man font-light text-[#1b1b1b] ">
        {footerColumn.list.map((li) => {
          return (
            <li key={li} className="my-2">
              {li}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterLinks;
