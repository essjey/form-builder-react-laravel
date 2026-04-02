import React from 'react';

type TextareaInputProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
    id: string;
    label?: string;
    error?: string;
    help?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
};

export default function TextareaInput({ label, error, help, labelClass, helpClass, errorClass, ...props }: TextareaInputProps) {
    return (
        <>
            {label && (
                <label htmlFor={props.id} className={labelClass}>
                    {label}
                </label>
            )}

            <textarea
                {...props}
                aria-invalid={!!error}
                aria-describedby={[
                    help ? `help-${props.id}` : null,
                    error ? `error-${props.id}` : null,
                ].filter(Boolean).join(' ') || undefined}
                className={props.className}
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
}