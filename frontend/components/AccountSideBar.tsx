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
      icon: <PiUserDuotone className="mx-auto size-6" />,
    },
    {
      id: "addresses",
      name: "آدرس‌ها",
      icon: <PiSignpostDuotone className="mx-auto size-6" />,
    },
    {
      id: "orders",
      name: "سفارشات",
      icon: <PiPackageDuotone className="mx-auto size-6" />,
    },
    {
      id: "invoices",
      name: "فاکتورها",
      icon: <PiInvoiceDuotone className="mx-auto size-6" />,
    },
  ];

  return (
    <>
      {/* mobile and tablet sidebar */}
      <aside className="mb-4 w-[90vw] overflow-x-auto bg-gray-50 p-4 lg:hidden">
        <nav>
          <ul className="flex justify-between gap-2 overflow-x-auto text-center">
            {sections.map((section) => (
              <li key={section.id} className="shrink-0 flex-grow">
                <Button
                  variant="default"
                  className={`flex h-20 w-full flex-col items-center justify-center gap-1 p-2 text-center text-xs !ring-0 !ring-offset-0 ${activeSection === section?.id ? "bg-black text-white" : "border-0 !bg-white !text-black"}`}
                  onClick={() => onSectionChange(section.id)}
                >
                  <span className="mx-auto mb-1 block size-6">
                    {section.icon}
                  </span>
                  <p className="text-xs">{section.name}</p>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* desktop sidebar */}
      <aside className="hidden p-8 lg:block lg:min-w-[150px] xl:min-w-[260px]">
        <h2 className="mb-4 border-b border-gray-700 pb-4 text-xl font-medium">
          حساب کاربری
        </h2>
        <nav>
          <ul className="lg:grid lg:gap-4">
            {sections.map((section) => (
              <li key={section.id}>
                <Button
                  variant="default"
                  className={`flex w-full gap-8 ${activeSection === section?.id ? "bg-black text-white" : "border-0 !bg-gray-50 !text-black"}`}
                  onClick={() => onSectionChange(section.id)}
                >
                  <span className="size-6">{section.icon}</span>
                  <p className="text-sm xl:text-base">{section.name}</p>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
