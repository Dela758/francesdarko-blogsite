import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  isLoading?: boolean;
  href?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  isLoading = false,
  href,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-sans text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-tertiary-accent text-on-surface px-6 py-3 rounded-sm hover:opacity-90 active:scale-[0.98]",
    secondary:
      "bg-surface-container-high text-on-surface-variant px-6 py-3 rounded-sm hover:bg-surface-dim",
    outline:
      "border border-outline text-on-surface px-6 py-3 rounded-sm hover:border-tertiary-accent hover:text-tertiary-accent",
    ghost: "text-on-surface-variant hover:text-on-surface px-4 py-2",
    link: "text-link p-0 hover:text-tertiary-accent",
  }[variant];

  const content = (
    <>
      {isLoading && (
        <span
          className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses} ${className}`.trim()}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`.trim()}
      {...props}
    >
      {content}
    </button>
  );
}
