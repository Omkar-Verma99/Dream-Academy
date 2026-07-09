import Link from "next/link";
import type { ComponentProps } from "react";

interface TextLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode;
  showArrow?: boolean;
}

export function TextLink({
  children,
  className = "",
  showArrow = true,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={`${showArrow ? "link-arrow" : "font-sans text-sm font-medium text-forest no-underline transition-colors duration-200 hover:text-forest-hover hover:underline"} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

