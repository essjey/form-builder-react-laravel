import React from 'react';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> & {
    id: string;
    label?: string;
    error?: string;
    help?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
};

export default function Checkbox({
    label,
    error,
    help,
    labelClass,
    helpClass,
    errorClass,
    ...props
}: CheckboxProps) {
    return (
        <>
            <div className="flex items-center gap-2">
                <input
                    {...props}
                    id={props.id}
                    type="checkbox"
                    aria-invalid={!!error}
                    aria-describedby={[
                        help ? `help-${props.id}` : null,
                        error ? `error-${props.id}` : null,
                    ].filter(Boolean).join(' ') || undefined}
                    className={props.className}
                />

                {label && (
                    <label htmlFor={props.id} className={labelClass}>
                        {label}
                    </label>
                )}
            </div>

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
}