import { PiMailboxDuotone, PiSignpostDuotone } from "react-icons/pi";
import { Button } from "./Button";
import Card from "./Card";

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
    <Card bodyClassName="grid gap-3 w-full px-4">
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      <span className="flex gap-4">
        <PiSignpostDuotone className="size-4.5 shrink-0" />
        <p className="text-sm text-gray-700 md:text-base">{address}</p>
      </span>

      <span className="flex gap-2">
        <PiMailboxDuotone className="size-4.5" />
        <p className="text-sm text-gray-600 md:text-base">{postalCode}</p>
      </span>
      <div className="mt-12 flex w-full flex-wrap gap-4">
        <Button variant="default" className="flex-grow px-10">
          ویرایش
        </Button>
        <Button variant="outlined" className="flex-grow px-10">
          حذف
        </Button>
      </div>
    </Card>
  );
}
