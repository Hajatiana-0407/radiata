import React from 'react';

interface InputGroupProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  helperText?: string;
}

export function InputGroup({
  label,
  error,
  required,
  children,
  helperText,
}: InputGroupProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
