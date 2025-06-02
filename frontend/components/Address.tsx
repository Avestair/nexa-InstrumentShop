import { PiPlus } from "react-icons/pi";
import AddressCard from "../ui/AddressCard";
import { Button } from "../ui/Button";

export default function Addresses() {
  return (
    <section className="mb-8 rounded-lg bg-white p-4">
      <h2 className="mb-6 border-b pb-4 text-3xl font-semibold text-gray-800">
        آدرس‌ها
      </h2>
      <div className="">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AddressCard
            postalCode="۱۲۳۴۵-۶۷۸۹۰"
            title="آدرس اصلی"
            address="استان تهران، شهر تهران، خیابان آزادی، کوچه چهارم، پلاک ۱۰"
          />
          <AddressCard title="آدرس دوم" address="fvfg" postalCode="545454" />
        </div>

        <Button variant="default" className="mt-6 flex gap-2">
          <PiPlus className="mt-0.5 size-6" />
          افزودن آدرس جدید
        </Button>
      </div>
    </section>
  );
}
