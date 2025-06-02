interface DividerProps {
  dir: "ver" | "hor";
  className?: string;
}

export default function Divider({ dir, className }: DividerProps) {
  return (
    <span
      className={`bg-gray-300 ${dir === "hor" ? "w-1" : "h-1"} ${className}`}
    ></span>
  );
}
