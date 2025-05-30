import {
  PiInvoiceDuotone,
  PiPackageDuotone,
  PiSignpostDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import { Button } from "../ui/Button";

interface AccountSidebarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function AccountSidebar({
  activeSection,
  onSectionChange,
}: AccountSidebarProps) {
  const sections = [
    {
      id: "account-details",
      name: "جزئیات حساب",
      icon: <PiUserDuotone className="size-6" />,
    },
    {
      id: "addresses",
      name: "آدرس‌ها",
      icon: <PiSignpostDuotone className="size-6" />,
    },
    {
      id: "orders",
      name: "سفارشات",
      icon: <PiPackageDuotone className="size-6" />,
    },
    {
      id: "invoices",
      name: "فاکتورها",
      icon: <PiInvoiceDuotone className="size-6" />,
    },
  ];

  return (
    <aside className="min-w-[260px] p-8">
      <h2 className="mb-4 border-b border-gray-700 pb-4 text-xl font-medium">
        حساب کاربری
      </h2>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-4">
              <Button
                variant="default"
                className={`flex w-full gap-8 ${activeSection === section?.id ? "bg-black text-white" : "border-0 !bg-gray-50 !text-black"}`}
                onClick={() => onSectionChange(section.id)}
              >
                {section.icon}
                {section.name}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
