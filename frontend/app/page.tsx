import ProductCard from "../ui/ProductCard";

export default function Home() {
  const fakeProducts = [
    {
      id: 1,
      discount: 40,
      imageUrl: "/productImage.jpg",
      href: "/products/1",
      title: "محصول تستی ۱",
      price: 200000,
      originalPrice: 250000,
      ProductColors: [
        { productColor: "#000000", colorName: "مشکی" },
        { productColor: "#FF0000", colorName: "قرمز" },
        { productColor: "#0000FF", colorName: "آبی" },
      ],
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      id: 2,
      discount: 25,
      imageUrl: "/productImage.jpg",
      href: "/products/2",
      title: "محصول تستی ۲",
      price: 350000,
      originalPrice: 400000,
      ProductColors: [
        { productColor: "#00FF00", colorName: "سبز" },
        { productColor: "#FFFF00", colorName: "زرد" },
      ],
      rating: 4.2,
      reviews: 86,
      inStock: true,
    },
    {
      id: 3,
      discount: 1,
      imageUrl: "/productImage.jpg",
      href: "/products/3",
      title: "محصول تستی ۳",
      price: 150000,
      originalPrice: 150000,
      ProductColors: [
        { productColor: "#800080", colorName: "بنفش" },
        { productColor: "#FFA500", colorName: "نارنجی" },
        { productColor: "#A52A2A", colorName: "قهوه ای" },
      ],
      rating: 3.8,
      reviews: 42,
      inStock: false,
    },
    {
      id: 4,
      discount: 15,
      imageUrl: "/productImage.jpg",
      href: "/products/4",
      title: "محصول تستی ۴",
      price: 275000,
      originalPrice: 300000,
      ProductColors: [
        { productColor: "#FFC0CB", colorName: "صورتی" },
        { productColor: "#808080", colorName: "خاکستری" },
      ],
      rating: 4.7,
      reviews: 215,
      inStock: true,
    },
    {
      id: 5,
      discount: 30,
      imageUrl: "/productImage.jpg",
      href: "/products/5",
      title: "محصول تستی ۵",
      price: 180000,
      originalPrice: 250000,
      ProductColors: [
        { productColor: "#000000", colorName: "مشکی" },
        { productColor: "#FFFFFF", colorName: "سفید" },
      ],
      rating: 4.0,
      reviews: 64,
      inStock: true,
    },
  ];

  const colors = [
    { productColor: "#000000" },
    { productColor: "#FF0000" },
    { productColor: "#0000FF" },
  ];

  return (
    <div className="text-xl-3 grid-cols-auto-fit grid gap-5">
      {fakeProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          discount={product.discount}
          imageUrl={product.imageUrl}
          href={product.href}
          title={product.title}
          price={product.price}
          ProductColors={product.ProductColors}
        />
      ))}
    </div>
  );
}
