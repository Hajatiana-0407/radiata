'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface RadioGroupContextValue {
    value: string;
    onValueChange: (value: string) => void;
    name: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ className, value: valueProp, defaultValue, onValueChange, name, children, ...props }, ref) => {
        const [internalValue, setInternalValue] = React.useState(defaultValue || '');
        const groupName = name || React.useId();

        const value = valueProp !== undefined ? valueProp : internalValue;

        const handleValueChange = (newValue: string) => {
            if (valueProp === undefined) {
                setInternalValue(newValue);
            }
            onValueChange?.(newValue);
        };

        return (
            <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange, name: groupName }}>
                <div
                    ref={ref}
                    role="radiogroup"
                    className={cn('space-y-2', className)}
                    {...props}
                >
                    {children}
                </div>
            </RadioGroupContext.Provider>
        );
    }
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
    ({ className, value, id, children, ...props }, ref) => {
        const context = React.useContext(RadioGroupContext);

        if (!context) {
            throw new Error('RadioGroupItem must be used within a RadioGroup');
        }

        const { value: groupValue, onValueChange, name } = context;
        const itemId = id || React.useId();
        const isChecked = groupValue === value;

        return (
            <div className="flex items-center">
                <input
                    ref={ref}
                    type="radio"
                    id={itemId}
                    name={name}
                    value={value}
                    checked={isChecked}
                    onChange={() => onValueChange(value)}
                    className={cn(
                        'peer sr-only',
                        className
                    )}
                    {...props}
                />
                {children}
            </div>
        );
    }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };