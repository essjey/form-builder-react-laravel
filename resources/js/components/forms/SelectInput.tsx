import React from 'react';

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
    id: string;
    label?: string;
    error?: string;
    help?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
    options: { value: string; label: string }[];
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
        label,
        error,
        help,
        labelClass,
        helpClass,
        errorClass,
        options,
        ...props
    },
    ref
) {
    return (
        <>
            {label && (
                <label htmlFor={props.id} className={labelClass}>
                    {label}
                </label>
            )}

            <select
                {...props}
                ref={ref}
                aria-invalid={!!error}
                aria-describedby={[
                    help ? `help-${props.id}` : null,
                    error ? `error-${props.id}` : null,
                ].filter(Boolean).join(' ') || undefined}
                className={props.className}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

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

export default Select;