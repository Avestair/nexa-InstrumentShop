"use client";

import React from "react";
import { Button } from "./Button";
import {
  PiMinus,
  PiPlusBold,
  PiShoppingCartDuotone,
  PiTrashDuotone,
} from "react-icons/pi";
import { useCartStore } from "../stores/CartStore";
import { productTypes } from "../types/ProductTypes";

export default function ProductActions({ product }: Partial<productTypes>) {
  const { items, addToCart, updateQuantity, removeFromCart } = useCartStore();

  const cartItem = items.find((item) => item.id === id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const id = product.id;
  const title = product.title;
  const price = product.price;
  const imageUrl = product.imageUrl;

  const handleAddToCart = () => {
    addToCart({ id, name: title, price, imageUrl });
  };

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
    <>
      {!isInCart && (
        <div>
          <Button onClick={() => handleAddToCart} className="flex gap-4">
            <PiShoppingCartDuotone className="size-5.5" />
            <p>اضافه به سبد خرید</p>
          </Button>
        </div>
      )}
      {isInCart && (
        <div>
          <div className="mt-2 flex w-full justify-between">
            <Button
              variant="danger"
              onClick={handleDeletingItem}
              aria-label={`Remove ${title} from cart`}
            >
              <PiTrashDuotone className="size-5" />
            </Button>
            <div className="flex h-fit items-center justify-between rounded-sm bg-black px-2 text-white">
              <button
                onClick={handleDecreaseQuantity}
                className="cursor-pointer px-4 py-3 text-white"
                aria-label={`Decrease quantity of ${title}`}
              >
                <PiMinus className="size-5" />
              </button>
              <p className="text-md font-semibold" aria-live="polite">
                {currentQuantity}
              </p>
              <button
                onClick={handleIncreaseQuantity}
                className="cursor-pointer px-4 py-3 text-white"
                aria-label={`Increase quantity of ${title}`}
              >
                <PiPlusBold className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
