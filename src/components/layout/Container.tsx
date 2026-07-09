import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "nav" | "header" | "footer";
  narrow?: boolean;
  wide?: boolean;
}

export function Container({
  children,
  className = "",
  as: Component = "div",
  narrow = false,
  wide = false,
}: ContainerProps) {
  const maxWidth = narrow
    ? "max-w-[65ch]"
    : wide
      ? "max-w-[1440px]"
      : "max-w-[1280px]";

  return (
    <Component
      className={`mx-auto w-full ${maxWidth} px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Component>
  );
}

