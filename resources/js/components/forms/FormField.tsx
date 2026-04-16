import React from 'react';
import type { Field } from '@/types/forms';
import Checkbox from './CheckboxInput';
import EmailInput from './EmailInput';
import Select from './SelectInput';
import Textarea from './TextareaInput';
import TextInput from './TextInput';

type FormFieldProps = {
    field: Field;
    error?: string;
    register: any;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
    inputClass?: string;
};

export default function FormField({
    field,
    error,
    register,
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
                    {...register(field.name)}
                    type="text"
                    placeholder={field.placeholder}
                    minLength={field.min}
                    maxLength={field.max}
                />
            );
        case 'date':
            return (
                <TextInput
                    {...commonProps}
                    {...register(field.name)}
                    type="date"
                />
            );

        case 'email':
            return (
                <EmailInput
                    {...commonProps}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                />
            );

        case 'textarea':
            return (
                <Textarea
                    {...commonProps}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    minLength={field.min}
                    maxLength={field.max}
                />
            );

        case 'select':
            return (
                <Select
                    {...commonProps}
                    {...register(field.name)}
                    options={field.options ?? []}
                    multiple={field.multiple}
                />
            );

        case 'checkbox':
            return (
                <Checkbox
                    {...commonProps}
                    {...register(field.name)}
                />
            );

        default:
            return null;
    }
}