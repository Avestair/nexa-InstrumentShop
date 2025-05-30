import { Button } from "../ui/Button";

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

  return (
    <section className="mb-8 rounded-sm p-8">
      <h2 className="mb-6 border-b pb-4 text-right text-3xl font-semibold text-gray-800">
        فاکتورها
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white text-right">
          <thead>
            <tr className="bg-gray-100 text-sm leading-normal text-gray-600 uppercase">
              <th className="border-b border-gray-200 px-6 py-3">
                شماره فاکتور
              </th>
              <th className="border-b border-gray-200 px-6 py-3">تاریخ</th>
              <th className="border-b border-gray-200 px-6 py-3">مبلغ</th>
              <th className="border-b border-gray-200 px-6 py-3">وضعیت</th>
              <th className="border-b border-gray-200 px-6 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-700">
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-3">{invoice.id}</td>
                <td className="px-6 py-3">{invoice.date}</td>
                <td className="px-6 py-3">{invoice.amount}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${invoice.status === "پرداخت شده" ? "bg-green-200 text-green-800" : ""} ${invoice.status === "پرداخت نشده" ? "bg-red-200 text-red-800" : ""} `}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <Button variant="default" className="!text-xs">
                    دانلود
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
