"use client";

import { useEffect } from "react";
import { CartItem } from "../../types/CartItem";
import ProductCardCart from "../../ui/ProductCardCart";
import { useCartStore } from "../../stores/CartStore";
import { fetchAndUpdateCartDetails } from "../../utils/cartHelper";

export default function Page() {
  const { items } = useCartStore();

  // call this function on mount to update the cart items details like price etc.. from backend
  // useEffect(() => {
  //   fetchAndUpdateCartDetails();
  // }, []);

  const itemsToDisplay = items.filter((item) => item.quantity > 0);

  return (
    <div className="grid justify-items-center gap-4 p-2">
      <div className="grid w-[80%] gap-4 rounded-sm bg-white p-4">
        <h1 className="px-4 text-lg font-semibold md:text-2xl">سبد خرید</h1>
        <div className="rounded-sm border border-gray-200 bg-white">
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((item: CartItem, index: number) => (
              <ProductCardCart
                key={item.id}
                id={item.id}
                imgSrc={item.imageUrl}
                title={item.name}
                price={item.price}
                index={index}
                ProductColor={item.color || ""}
              />
            ))
          ) : (
            <p className="p-8 text-center text-lg text-gray-500">
              سبد خرید شما خالی است.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
