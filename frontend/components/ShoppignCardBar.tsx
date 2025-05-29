"use client";

import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import { useCartStore } from "../stores/CartStore";

export default function ShoppignCardBar() {
  const { totalItems, totalPrice } = useCartStore();

//   if (totalItems === 0) {
//     return null;
//   }

  return (
    <div className="flex w-full justify-between p-4 z-10 bg-white border-t border-gray-200 fixed bottom-0">
      <Link href={"/cart"} className="flex gap-1 underline underline-offset-2">
        <PiArrowRight className="size-6.5 relative top-1" />
        <span className="underline underline-offset-2 font-semibold text-lg md:text-xl">سبد خرید</span>
      </Link>
      <div className="flex gap-6">
        <p className="font-semibold md:text-lg relative bottom-0.5 md:block hidden">
          {totalItems} مورد
        </p>
        <p className="font-semibold md:text-lg">
          {totalPrice.toLocaleString()} تومان
        </p>
      </div>
    </div>
  );
}