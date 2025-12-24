import clsx from "clsx";

interface BadgeProps {
  label?: string; // Optionnel car on peut utiliser children
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
  children?: React.ReactNode;
  className?: string;
}

export function Badge({
  label,
  variant = 'primary',
  children,
  className
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  // Priorité : children si fourni, sinon label
  const content = children ?? label;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {content}
    </span>

  );
}