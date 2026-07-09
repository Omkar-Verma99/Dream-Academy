import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-0 bg-[linear-gradient(135deg,#1e4fd6_0%,#163fad_50%,#0f2b7a_100%)] !text-white shadow-[0_8px_20px_-8px_rgba(30,79,214,0.55)] hover:bg-[linear-gradient(135deg,#2558e0_0%,#1a47c0_50%,#143894_100%)] hover:!text-white hover:no-underline hover:shadow-[0_12px_28px_-10px_rgba(30,79,214,0.6)]",
  secondary:
    "border border-brand/30 bg-paper !text-brand shadow-sm hover:border-brand/45 hover:bg-brand-soft hover:!text-brand hover:no-underline hover:shadow-md",
  ghost:
    "border border-transparent bg-transparent !text-brand hover:bg-brand-soft hover:!text-brand hover:no-underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "rounded-full px-5 py-2.5 text-sm",
  md: "rounded-full px-7 py-3 text-sm",
  lg: "rounded-full px-9 py-3.5 text-base",
};

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ComponentProps<"button"> & { href?: never };

type ButtonAsLink = ButtonBaseProps &
  ComponentProps<typeof Link> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className: string,
) {
  return `inline-flex items-center justify-center gap-2 font-sans font-bold no-underline transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = buttonClassName(variant, size, className);

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
