interface CardProps {
  children: React.ReactNode;
  bodyClassName?: string;
  containerClassName?: string;
}

export default function Card({
  children,
  bodyClassName,
  containerClassName,
}: CardProps) {
  return (
    <div
      className={`grid gap-3 rounded-lg border border-gray-200 p-4 ${containerClassName}`}
    >
      <div className={`${bodyClassName}`}>{children}</div>
    </div>
  );
}
