import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline" | "ghost" | "wa";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

type ButtonAsAnchor = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClass: Record<Variant, string> = {
  primary: "bt-btn--primary",
  accent: "bt-btn--accent",
  outline: "bt-btn--outline",
  ghost: "bt-btn--ghost",
  wa: "bt-btn--wa",
};

const sizeClass: Record<Size, string> = {
  sm: "bt-btn--sm",
  md: "",
  lg: "bt-btn--lg",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", block, className, children, ...rest } = props;
  const classes = cn(
    "bt-btn",
    variantClass[variant],
    sizeClass[size],
    block && "bt-btn--block",
    className,
  );

  if ("href" in rest && rest.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
