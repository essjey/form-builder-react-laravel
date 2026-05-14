import React from 'react';
import { cn } from '@/lib/utils';

type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> & {
    id: string;
    label?: string;
    error?: string;
    help?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
    { label, error, help, labelClass, helpClass, errorClass, ...props },
    ref
) {
    return (
        <>
            {label && (
                <label htmlFor={props.id} className={cn(`${labelClass}`)}>
                    {label}
                </label>
            )}

            <input
                {...props}
                ref={ref}
                aria-invalid={!!error}
                aria-describedby={[
                    help ? `help-${props.id}` : null,
                    error ? `error-${props.id}` : null,
                ].filter(Boolean).join(' ') || undefined}
                className={cn((props.className ?? '') + 'w-full rounded border px-3 py-2')}
            />

            {help && (
                <div id={`help-${props.id}`} className={helpClass}>
                    {help}
                </div>
            )}

            {error && (
                <div role="alert" id={`error-${props.id}`} className={errorClass}>
                    {error}
                </div>
            )}
        </>
    );
});

export default TextInput;