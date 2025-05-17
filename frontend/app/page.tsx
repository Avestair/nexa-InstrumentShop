import NavLink from "@/ui/NavLink";

export default function Home() {
  const test = [
    {
      title: "test",
      url: "./",
    },

    {
      title: "test",
      url: "./",
    },
  ];
  return (
    <div className="text-xl-3 hidden bg-white md:flex">
      <div className="flex gap-5">
        <NavLink url="./" title="test" />
        <NavLink url="./" title="test" isDropDown dropDownItems={test} />
      </div>
    </div>
  );
}
