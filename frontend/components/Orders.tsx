import { Button } from "../ui/Button";

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
      status: "تحویل شده",
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

  return (
    <section className="mb-8 bg-white p-8">
      <h2 className="mb-6 border-b pb-4 text-right text-3xl font-semibold text-gray-800">
        سفارشات
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-sm border border-gray-200 bg-white text-right">
          <thead>
            <tr className="rounded-sm bg-gray-100 text-sm leading-normal text-gray-600 uppercase">
              <th className="border-b border-gray-200 px-6 py-3">
                شماره سفارش
              </th>
              <th className="border-b border-gray-200 px-6 py-3">تاریخ</th>
              <th className="border-b border-gray-200 px-6 py-3">مبلغ کل</th>
              <th className="border-b border-gray-200 px-6 py-3">وضعیت</th>
              <th className="border-b border-gray-200 px-6 py-3">جزئیات</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-700">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-3">{order.id}</td>
                <td className="px-6 py-3">{order.date}</td>
                <td className="px-6 py-3">{order.total}</td>
                <td className="px-6 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${order.status === "تحویل شده" ? "bg-green-200 text-green-800" : ""} ${order.status === "در حال پردازش" ? "bg-yellow-200 text-yellow-800" : ""} ${order.status === "لغو شده" ? "bg-red-200 text-red-800" : ""} `}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <Button variant="default" className="!text-xs">
                    مشاهده
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
