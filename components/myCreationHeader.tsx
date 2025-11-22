// components/ProductHeader.jsx

import Link from "next/link";
import Image from "next/image";
import { Jost } from "next/font/google";
import backIcon from "@/public/image/myCreationIcon/backIcon.svg";
import loveIcon from "@/public/image/myCreationIcon/loveIcon.svg";
import shareIcon from "@/public/image/myCreationIcon/shareIcon.svg";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ProductHeader = () => {
  return (
    // Applied sticky, top-0, z-10 for the sticky header effect
    <header className="bg-white border-b border-gray-200 p-2 sticky top-0 z-10">
      <div className="w-full px-10 md:px-10 lg:px-16 mx-auto flex justify-between items-center">
        {/* Back to Products Link */}
        <Link
          href="/"
          className="flex items-center hover:text-gray-900 transition duration-150 ease-in-out"
        >
          <Image
            src={backIcon}
            alt="Back"
            width={20}
            height={20}
            className="mr-2"
          />
          <span
            className={`${jostFont.className} uppercase text-[14px] text-[#1a1a1a] font-medium tracking-[2.1px]`}
          >
            Back to Products
          </span>
        </Link>

        {/* Action Icons */}
        <div className="flex space-x-2">
          {/* Favorite Icon */}
          <button
            aria-label="Add to favorites"
            className="p-3 border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-red-500 transition duration-150 ease-in-out"
          >
            <Image src={loveIcon} alt="Favorite" width={20} height={20} />
          </button>

          {/* Share Icon */}
          <button
            aria-label="Share product"
            className="p-3 border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            <Image src={shareIcon} alt="Share" width={20} height={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
