interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
}

export function Badge({ label, variant = 'primary' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]}`}>
      {label}
    </span>
  );
}
