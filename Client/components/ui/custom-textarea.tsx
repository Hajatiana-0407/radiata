import React from 'react';
import { cn } from '@/lib/utils';

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const CustomTextarea = React.forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(({ className, error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-destructive focus-visible:ring-destructive',
      className
    )}
    {...props}
  />
));
CustomTextarea.displayName = 'CustomTextarea';
