import React from 'react';
import { cn } from '@/lib/utils';

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-destructive focus-visible:ring-destructive',
        className
      )}
      {...props}
    />
  )
);
CustomInput.displayName = 'CustomInput';
