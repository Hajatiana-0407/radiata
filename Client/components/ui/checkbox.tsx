'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, checked, onCheckedChange, label, id, ...props }, ref) => {
        const [isChecked, setIsChecked] = React.useState(checked || false);

        React.useEffect(() => {
            if (checked !== undefined) {
                setIsChecked(checked);
            }
        }, [checked]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = e.target.checked;
            setIsChecked(newChecked);
            onCheckedChange?.(newChecked);
        };

        return (
            <div className="flex items-center space-x-2">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        id={id}
                        ref={ref}
                        checked={isChecked}
                        onChange={handleChange}
                        className={cn(
                            'peer h-4 w-4 shrink-0 rounded-sm border border-gray-300',
                            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            'checked:bg-blue-600 checked:border-blue-600',
                            className
                        )}
                        {...props}
                    />
                    <svg
                        className="absolute left-0 top-0 h-4 w-4 opacity-0 peer-checked:opacity-100 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                {label && (
                    <label
                        htmlFor={id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
            </div>
        );
    }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };