import React, { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "./Modal";
import Table from "../ui/Table";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: string;
}

export default function Invoices() {
  const invoices: Invoice[] = [
    {
      id: "INV001",
      date: "۱۴۰۲/۰۳/۲۰",
      amount: "۱,۲۰۰,۰۰۰ تومان",
      status: "پرداخت شده",
    },
    {
      id: "INV002",
      date: "۱۴۰۲/۰۲/۰۵",
      amount: "۵۵۰,۰۰۰ تومان",
      status: "پرداخت نشده",
    },
    {
      id: "INV003",
      date: "۱۴۰۲/۰۱/۱۵",
      amount: "۸۵,۰۰۰ تومان",
      status: "پرداخت شده",
    },
  ];

  const headerForModal = [
    "ردیف",
    "شرح کالا / خدمات",
    "تعداد",
    "قیمت واحد (ریال)",
    "مبلغ کل (ریال)",
  ];
  const dataForModal = [
    ["1", "لپ تاپ مدل X32", "2", "35000000", "70000000"],
    ["2", "ماوس بی سیم", "3", "800000", "2400000"],
    ["3", "کیبورد مکانیکی", "1", "2500000", "2500000"],
    ["4", "نصب نرم افزار", "1", "1500000", "1500000"],
  ];

  const mainTableHeaders = ["شماره فاکتور", "تاریخ", "مبلغ", "وضعیت", "عملیات"];

  const mainTableData = invoices.map((invoice) => {
    const [showModalForThisInvoice, setShowModalForThisInvoice] =
      useState(false);

    function toggleModalForThisInvoice() {
      setShowModalForThisInvoice(!showModalForThisInvoice);
    }

    return [
      invoice.id,
      invoice.date,
      invoice.amount,
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${invoice.status === "پرداخت شده" ? "bg-green-200 text-green-800" : ""} ${invoice.status === "پرداخت نشده" ? "bg-red-200 text-red-800" : ""} `}
        key={`${invoice.id}-status`}
      >
        {invoice.status}
      </span>,
      <React.Fragment key={`${invoice.id}-actions`}>
        <Button
          onClick={toggleModalForThisInvoice}
          variant="default"
          className="!text-xs"
        >
          مشاهده
        </Button>
        {showModalForThisInvoice && (
          <Modal
            title="اطلاعات فاکتور"
            description={`شما در حال مشاهده اطلاعات فاکتور ${invoice.id} هستید`}
            body={
              <div className="p-4">
                <Table
                  initialData={dataForModal}
                  initialHeaders={headerForModal}
                />
              </div>
            }
            onClose={toggleModalForThisInvoice}
          />
        )}
      </React.Fragment>,
    ];
  });

  return (
    <section className="mb-8 rounded-sm p-2">
      <h2 className="mb-6 border-b pb-4 text-right text-3xl font-semibold text-gray-800">
        فاکتورها
      </h2>
      <div>
        <Table initialHeaders={mainTableHeaders} initialData={mainTableData} />
      </div>
    </section>
  );
}
