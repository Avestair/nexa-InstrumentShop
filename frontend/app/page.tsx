import ProductCard from "../ui/ProductCard";

export default function Home() {
  const test = [
    {
      title: "test",
      url: "/",
    },

    {
      title: "test",
      url: "/",
    },
  ];

  const colors = [
    { productColor: "#000000" },
    { productColor: "#FF0000" },
    { productColor: "#0000FF" },
  ];

  return (
    <div className="text-xl-3 grid-cols-auto-fit grid gap-5">
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
      <ProductCard
        id={1}
        imageUrl="/productImage.jpg"
        href={"/"}
        title={"محصول تستی"}
        price={200000}
        ProductColors={colors}
      />
    </div>
  );
}
