interface TagBadgeProps {
  tag: string;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function TagBadge({ tag, className = "", isActive, onClick }: TagBadgeProps) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`tag cursor-pointer transition-all duration-200 hover:opacity-80 ${
          isActive
            ? "!bg-tertiary-accent/25 !text-on-surface font-medium ring-1 ring-tertiary-accent"
            : ""
        } ${className}`.trim()}
      >
        {tag}
      </button>
    );
  }

  return (
    <span
      className={`tag transition-colors duration-200 ${
        isActive
          ? "!bg-tertiary-accent/25 !text-on-surface font-medium ring-1 ring-tertiary-accent"
          : ""
      } ${className}`.trim()}
    >
      {tag}
    </span>
  );
}
