import { LuLogIn } from 'react-icons/lu';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa6';
import { headerLinks } from '@/assets';
import Link from 'next/link';

const Menu = () => {
  return (
    <div className="dropdown dropdown-end lg:hidden">
      <div tabIndex={0} role="button" className="btn text-4xl m-1">
        <label className="btn btn-circle swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content gap-3 z-[1] menu p-4 shadow bg-white border-b-2 border-black  w-[93vw] rounded-md"
      >
        {headerLinks.map((li) => {
          return (
            <Link
              key={li}
              className={`${li === '|' ? 'hidden' : ''} text-xl`}
              href={`/${li}`}
            >
              <li className="text-xl">{li}</li>
            </Link>
          );
        })}
        <div className="w-full flex justify-between items-center text-[#222] text-4xl  mt-3 font-man font-extralight">
          <Link href="/cart">
            <MdOutlineShoppingBag />
          </Link>
          <Link href="/wishList">
            <FaHeart />
          </Link>
          <Link href={'/sign-up'}>
            <LuLogIn />
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Menu;
