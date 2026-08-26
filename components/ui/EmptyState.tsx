import type { ReactNode } from "react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fade-in flex flex-col items-center justify-center py-16 text-center ${className}`.trim()}
    >
      {icon && <div className="mb-4 text-neutral" aria-hidden="true">{icon}</div>}
      <h3 className="headline-sm mb-2 text-on-surface">{title}</h3>
      <p className="body-lg mx-auto max-w-md text-on-surface-variant mb-6">
        {description}
      </p>
      {action && (
        <Button
          variant="secondary"
          href={action.href}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
