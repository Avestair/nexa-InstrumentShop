import { PiMailboxDuotone, PiSignpostDuotone } from "react-icons/pi";
import { Button } from "./Button";

interface AddressCardProps {
  address: string;
  title: string;
  postalCode: string;
}

export default function AddressCard({
  address,
  title,
  postalCode,
}: AddressCardProps) {
  return (
    <div className="grid gap-3 rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      <span className="flex gap-3">
        <PiSignpostDuotone className="mt-1.5 size-4.5" />
        <p className="text-gray-700">{address}</p>
      </span>

      <span className="flex gap-3">
        <PiMailboxDuotone className="size-4.5" />
        <p className="text-sm text-gray-600">{postalCode}</p>
      </span>
      <div className="mt-12 flex gap-4">
        <Button variant="default" className="px-10">
          ویرایش
        </Button>
        <Button variant="outlined" className="px-10">
          حذف
        </Button>
      </div>
    </div>
  );
}
