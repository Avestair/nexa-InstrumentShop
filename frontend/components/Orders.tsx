import React from "react";
import { Button } from "../ui/Button"; // Assuming this path is correct for your Button component
import Table from "../ui/Table"; // Assuming your Table component is in Table.tsx

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
}

export default function Orders() {
  const orders: Order[] = [
    {
      id: "ORD001",
      date: "۱۴۰۲/۰۳/۱۵",
      total: "۱,۲۰۰,۰۰۰ تومان",
      status: "تحویل داده شده",
    },
    {
      id: "ORD002",
      date: "۱۴۰۲/۰۲/۰۱",
      total: "۵۵۰,۰۰۰ تومان",
      status: "در حال پردازش",
    },
    {
      id: "ORD003",
      date: "۱۴۰۲/۰۱/۱۰",
      total: "۸۵,۰۰۰ تومان",
      status: "لغو شده",
    },
  ];

  // Define the headers for the Table component
  const tableHeaders: string[] = [
    "شماره سفارش",
    "تاریخ",
    "مبلغ کل",
    "وضعیت",
    "جزئیات",
  ];

  // Transform your 'orders' data into the format expected by the Table component
  // (string | React.ReactNode)[][]
  const tableData: (string | React.ReactNode)[][] = orders.map((order) => [
    order.id,
    order.date,
    order.total,
    // For the status, render the span directly as a React.ReactNode
    <span
      key={`${order.id}-status`} // Add a key when rendering React nodes in a loop
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        order.status === "تحویل داده شده"
          ? "bg-green-300/40 text-green-600"
          : order.status === "در حال پردازش"
            ? "bg-yellow-200/40 text-yellow-500"
            : order.status === "لغو شده"
              ? "bg-red-300/30 text-red-600"
              : ""
      }`}
    >
      {order.status}
    </span>,
    // For the details button, render the Button component directly
    <Button key={`${order.id}-details`} variant="default" className="!text-xs">
      مشاهده
    </Button>,
  ]);

  return (
    <section className="mb-8 bg-white p-8">
      <h2 className="mb-6 border-b pb-4 text-right text-3xl font-semibold text-gray-800">
        سفارشات
      </h2>

      {/* Render the generic Table component with order-specific headers and data */}
      <Table initialHeaders={tableHeaders} initialData={tableData} />
    </section>
  );
}
