import React from 'react';
import { cn } from '@/lib/utils';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> & {
    id: string;
    label?: string;
    error?: string;
    help?: string;
    checkWrapClass?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    {
        label,
        error,
        help,
        checkWrapClass,
        labelClass,
        helpClass,
        errorClass,
        ...props
    },
    ref
) {
    return (
        <>
            <div className={cn('flex items-start gap-3', checkWrapClass)}>
                <input
                    {...props}
                    ref={ref}
                    id={props.id}
                    type="checkbox"
                    aria-invalid={!!error}
                    aria-describedby={[
                        help ? `help-${props.id}` : null,
                        error ? `error-${props.id}` : null,
                    ].filter(Boolean).join(' ') || undefined}
                    className={cn('mt-1 shrink-0', props.className)}
                />

                {label && (
                    <label htmlFor={props.id} className={cn('leading-6', labelClass)}>
                        {label}
                    </label>
                )}
            </div>

            {help && (
                <div id={`help-${props.id}`} className={cn('text-sm', helpClass)}>
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

export default Checkbox;