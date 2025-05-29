import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import ShoppignCardBar from "../components/ShoppignCardBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "My Awesome E-commerce Store",
    template: "%s | My Awesome E-commerce Store",
  },
  description:
    "Discover a wide range of high-quality products at great prices. Shop now for electronics, home goods, fashion, and more!",
  keywords: [
    "e-commerce",
    "shop",
    "online store",
    "products",
    "electronics",
    "fashion",
    "home goods",
    "best deals",
  ], // Relevant keywords
  authors: [{ name: "گروه برنامه نویسی نکسا" }],
  creator: "گروه برنامه نویسی نکسا",
  publisher: "گروه برنامه نویسی نکسا",
  openGraph: {
    title: "My Awesome E-commerce Store",
    description:
      "Discover a wide range of high-quality products at great prices. Shop now for electronics, home goods, fashion, and more!",
    url: "https://www.your-ecommerce-store.com", // TODO edit this later
    siteName: "My Awesome E-commerce Store",
    images: [
      {
        url: "https://www.your-ecommerce-store.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Awesome E-commerce Store Logo",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@your_twitter_handle", // Replace with your Twitter handle
  //   creator: "@your_twitter_handle",
  //   title: "My Awesome E-commerce Store",
  //   description: "Discover a wide range of high-quality products at great prices. Shop now for electronics, home goods, fashion, and more!",
  //   images: ["https://www.your-ecommerce-store.com/twitter-image.jpg"], // Replace with a relevant image for Twitter sharing
  // },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="mt-18 mb-18 p-4">{children}</div>
        <ShoppignCardBar />
      </body>
    </html>
  );
}
