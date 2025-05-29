import React, { JSX } from "react";

type ButtonVariant = "default" | "outlined" | "danger" | "warning" | "success";

const baseStyles =
  "py-2 px-4 cursor-pointer outline-none font-semibold rounded-sm transition-colors duration-300 ease-in-out";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props,
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export interface ButtonProps {
  variant?: ButtonVariant;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-black text-white hover:bg-white hover:text-black border border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  outlined:
    "bg-white text-black hover:bg-black hover:text-white border border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
  danger:
    "bg-red-200/80 text-red-500 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2",
  warning:
    "bg-yellow-200/80 text-yellow-500 hover:bg-yellow-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-offset-2",
  success:
    "bg-green-200/80 text-green-500 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2",
};

export function Button<C extends React.ElementType = "button">({
  as,
  variant = "default",
  className = "",
  children,
  ...rest
}: PolymorphicComponentProps<C, ButtonProps>): JSX.Element {
  const Component = as || "button";

  const defaultAppearance = variantStyles[variant];

  const disabledStyles =
    (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled &&
    Component === "button"
      ? "opacity-50 cursor-not-allowed"
      : "";

  const combinedClasses = `${baseStyles} ${defaultAppearance} ${disabledStyles} ${className}`;

  return (
    <Component className={combinedClasses} {...rest}>
      {children}
    </Component>
  );
}
