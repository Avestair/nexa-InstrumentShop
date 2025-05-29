"use client";

import { PiMinus, PiPlusBold, PiTrashDuotone } from "react-icons/pi";
import { Button } from "./Button";
import { useCartStore } from "../stores/CartStore";
import Image from "next/image";

interface ProductCardCartProps {
  imgSrc: string;
  title: string;
  price: number;
  id: number;
  ProductColor: string;
  index: number;
}

export default function ProductCardCart({
  imgSrc,
  title,
  price,
  id,
  ProductColor,
  index,
}: ProductCardCartProps) {
  const { items, updateQuantity, removeFromCart } = useCartStore();

  // Ensure item.id and id are of the same type for comparison
  const cartItem = items.find((item) => String(item.id) === String(id));
  const isInCart = !!cartItem;
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleIncreaseQuantity = () => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    updateQuantity(id, currentQuantity - 1);
  };

  const handleDeletingItem = () => {
    removeFromCart(id);
  };

  return (
    <div
      className={`flex w-full items-center justify-between ${
        items.length - 1 === index ? "" : "border-b"
      } border-gray-300 py-3`}
    >
      <div className="flex gap-3 px-4">
        <Image
          width={40}
          height={40}
          src={imgSrc}
          alt={`Image of ${title}`}
          className="rounded-sm"
        />
        <p className="mt-4">{title}</p>
      </div>
      <span
        className="rounded-full p-2"
        style={{ backgroundColor: ProductColor }}
      ></span>
      <p>${price.toLocaleString()}</p>
      <div className="flex gap-3 px-4">
        <div className="flex h-fit items-center justify-between gap-2 rounded-sm bg-black px-2 text-white">
          <button
            onClick={handleDecreaseQuantity}
            className="cursor-pointer px-1 py-2 text-white"
            aria-label={`Decrease quantity of ${title}`}
          >
            <PiMinus className="size-5" />
          </button>
          <p className="text-md font-semibold" aria-live="polite">
            {currentQuantity}
          </p>
          <button
            onClick={handleIncreaseQuantity}
            className="cursor-pointer px-1 py-3 text-white"
            aria-label={`Increase quantity of ${title}`}
          >
            <PiPlusBold className="size-4" />
          </button>
        </div>
        <Button
          onClick={handleDeletingItem}
          className="h-fit border-0 !bg-red-200/30"
          variant="default"
        >
          <PiTrashDuotone className="size-6 fill-red-400" />
        </Button>
      </div>
    </div>
  );
}
