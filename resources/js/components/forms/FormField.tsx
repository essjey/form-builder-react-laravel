import React from 'react';
import type { Field } from '@/types/forms';
import Checkbox from './CheckboxInput';
import EmailInput from './EmailInput';
import Select from './SelectInput';
import Textarea from './TextareaInput';
import TextInput from './TextInput';

type FormFieldProps = {
    field: Field;
    value: string | boolean | string[] | undefined;
    error?: string;
    onChange: (name: string, value: string | boolean | string[]) => void;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
    inputClass?: string;
};

export default function FormField({
    field,
    value,
    error,
    onChange,
    labelClass,
    helpClass,
    errorClass,
    inputClass,
}: FormFieldProps) {
    const commonProps = {
        id: field.name,
        name: field.name,
        label: field.label,
        help: field.help,
        error,
        required: field.required,
        labelClass,
        helpClass,
        errorClass,
        className: inputClass,
    };

    switch (field.type) {
        case 'text':
            return (
                <TextInput
                    {...commonProps}
                    type="text"
                    value={typeof value === 'string' ? value : ''}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            );
        case 'date':
            return (
                <TextInput
                    {...commonProps}
                    type="date"
                    value={typeof value === 'string' ? value : ''}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            );

        case 'email':
            return (
                <EmailInput
                    {...commonProps}
                    value={typeof value === 'string' ? value : ''}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            );

        case 'textarea':
            return (
                <Textarea
                    {...commonProps}
                    value={typeof value === 'string' ? value : ''}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            );

        case 'select':
            return (
                <Select
                    {...commonProps}
                    options={field.options ?? []}
                    multiple={field.multiple}
                    value={
                        field.multiple
                            ? Array.isArray(value)
                                ? value
                                : []
                            : typeof value === 'string'
                                ? value
                                : ''
                    }
                    onChange={(e) => {
                        if (field.multiple) {
                            const selectedValues = Array.from(e.target.selectedOptions).map(
                                (option) => option.value
                            );
                            onChange(field.name, selectedValues);
                        } else {
                            onChange(field.name, e.target.value);
                        }
                    }}
                />
            );

        case 'checkbox':
            return (
                <Checkbox
                    {...commonProps}
                    checked={Boolean(value)}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                />
            );

        default:
            return null;
    }
}