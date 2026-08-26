import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = "rectangular",
  width,
  height,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-surface-container-high/60 rounded-sm";

  const variantClasses = {
    text: "h-4 w-full rounded",
    rectangular: "w-full h-full",
    circular: "rounded-full",
  }[variant];

  const inlineStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      className={`${baseClasses} ${variantClasses} ${className}`.trim()}
      style={inlineStyle}
      {...props}
    />
  );
}
