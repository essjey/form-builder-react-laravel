import * as SwitchPrimitive from '@radix-ui/react-switch';
import React from 'react';
import { cn } from '@/lib/utils';

type SwitchInputProps = {
    id: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label?: string;
    help?: string;
    error?: string;
    disabled?: boolean;
    wrapperClass?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
    className?: string;
};

export default function SwitchInput({
    id,
    checked,
    onCheckedChange,
    label,
    help,
    error,
    disabled = false,
    wrapperClass,
    labelClass,
    helpClass,
    errorClass,
    className,
}: SwitchInputProps) {
    return (
        <div className={cn('flex items-center justify-between gap-4', wrapperClass)}>
            <div>
                {label && (
                    <label htmlFor={id} className={labelClass}>
                        {label}
                    </label>
                )}

                {help && (
                    <p id={`help-${id}`} className={helpClass}>
                        {help}
                    </p>
                )}

                {error && (
                    <p role="alert" id={`error-${id}`} className={errorClass}>
                        {error}
                    </p>
                )}
            </div>

            <SwitchPrimitive.Root
                id={id}
                checked={checked}
                disabled={disabled}
                onCheckedChange={onCheckedChange}
                aria-invalid={!!error}
                aria-describedby={[
                    help ? `help-${id}` : null,
                    error ? `error-${id}` : null,
                ].filter(Boolean).join(' ') || undefined}
                className={cn(
                    'relative h-8 w-14 rounded-full transition-colors',
                    'bg-surface-container-high data-[state=checked]:bg-primary',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    className,
                )}
            >
                <SwitchPrimitive.Thumb
                    className={cn(
                        'block h-6 w-6 translate-x-1 rounded-full bg-background shadow transition-transform',
                        'data-[state=checked]:translate-x-7',
                    )}
                />
            </SwitchPrimitive.Root>
        </div>
    );
}