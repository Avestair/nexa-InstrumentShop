"use client";

import React from "react";
import { productColor } from "../types/ProductTypes";

type ProductPageColorPicker = {
  color: productColor;
  selectedColor: productColor | null;
};

export default function ProductPageColorPicker({
  color,
  selectedColor,
}: ProductPageColorPicker) {
  function pickColor(color: productColor) {
    selectedColor === color;
  }
  return (
    <button
      key={color.hex}
      className="h-8 w-8 rounded-full border border-gray-200"
      style={{ backgroundColor: color.hex }}
      onClick={() => pickColor(color)}
      aria-label={color.name}
    />
  );
}
