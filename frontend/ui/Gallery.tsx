"use client";

import { useState } from "react";
import Image from "next/image";
// import InnerImageZoom from "react-inner-image-zoom";

type GalleryProps = {
  images: string[];
  altText: string;
};

export function Gallery({ images, altText }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square">
        <Image
          src={images[selectedImage]}
          alt={`${altText} - Main view`}
          fill
          className="object-contain"
          priority
        />

        {/* <InnerImageZoom
          src={images[selectedImage]}
          zoomSrc={images[selectedImage]}
          zoomType="hover"
          className="object-contain"
          aria-label={`Zoomable image of ${altText}`}
        /> */}
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative aspect-square cursor-pointer transition-opacity ${
              selectedImage === index
                ? "ring-2 ring-black"
                : "opacity-50 hover:opacity-100"
            }`}
            aria-label={`View ${altText} - Variation ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${altText} - Variation ${index + 1}`}
              loading="eager"
              quality={60}
              fill
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
