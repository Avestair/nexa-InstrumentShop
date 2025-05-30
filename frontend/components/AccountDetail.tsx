import { Button } from "../ui/Button";
import Input from "../ui/Input";

export default function AccountDetails() {
  return (
    <section className="mb-8 rounded-lg p-8">
      <h2 className="mb-12 border-b pb-4 text-right text-2xl font-medium text-gray-800">
        جزئیات حساب
      </h2>
      <div className="grid grid-cols-1 gap-6 text-right md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block px-1 text-sm font-bold text-gray-700"
          >
            نام:
          </label>
          <Input type="text" id="name" defaultValue="علی احمدی" />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            ایمیل:
          </label>
          <Input
            type="email"
            id="email"
            defaultValue="ali.ahmadi@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            شماره تلفن:
          </label>
          <Input
            type="tel"
            id="phone"
            placeholder="شماره تلفن خود را وارد کنید"
            defaultValue="+989123456789"
          />
        </div>
      </div>
      <Button className="mt-6 h-fit p-2 !px-14">ذخیره تغییرات</Button>
    </section>
  );
}
