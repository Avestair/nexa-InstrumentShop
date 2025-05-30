import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  ariaLabel?: string;
  className?: string;
}

export default function Input({ type, ariaLabel, className }: InputProps) {
  return (
    <input
      aria-label={ariaLabel}
      type={type}
      className={`focus:border-my-primary rounded-sm border border-gray-200 p-2 text-gray-800 transition-all duration-300 outline-none placeholder:text-sm placeholder:text-gray-500 ${className}`}
    />
  );
}
