import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, Path } from 'react-hook-form';
import type { Field } from '@/types/forms';
import Checkbox from './CheckboxInput';
import EmailInput from './EmailInput';
import Select from './SelectInput';
import Textarea from './TextareaInput';
import TextInput from './TextInput';

type FormValues = Record<string, unknown>;

type FormFieldProps = {
    field: Field;
    error?: string;
    control: Control<FormValues>;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
    inputClass?: string;
};

export default function FormField({
    field,
    control,
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
        required: field.required,
        labelClass,
        helpClass,
        errorClass,
        className: inputClass,
    };

    const fieldName = field.name as Path<FormValues>;

    switch (field.type) {
        case 'text':
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: rhfField, fieldState }) => (
                        <TextInput
                            {...commonProps}
                            {...rhfField}
                            type="text"
                            error={fieldState.error?.message}
                            value={typeof rhfField.value === 'string' ? rhfField.value : ''}
                            placeholder={field.placeholder}
                            minLength={field.min}
                            maxLength={field.max}
                        />
                    )}
                />
            );

        case 'date':
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: rhfField, fieldState }) => (
                        <TextInput
                            {...commonProps}
                            {...rhfField}
                            error={fieldState.error?.message}
                            type="date"
                            value={typeof rhfField.value === 'string' ? rhfField.value : ''}
                        />
                    )}
                />
            );

        case 'email':
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: rhfField, fieldState }) => (
                        <EmailInput
                            {...commonProps}
                            {...rhfField}
                            error={fieldState.error?.message}
                            value={typeof rhfField.value === 'string' ? rhfField.value : ''}
                            placeholder={field.placeholder}
                        />
                    )}
                />
            );

        case 'textarea':
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: rhfField, fieldState }) => (
                        <Textarea
                            {...commonProps}
                            {...rhfField}
                            error={fieldState.error?.message}
                            value={typeof rhfField.value === 'string' ? rhfField.value : ''}
                            placeholder={field.placeholder}
                            minLength={field.min}
                            maxLength={field.max}
                        />
                    )}
                />
            );

        case 'select':
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: rhfField, fieldState }) => (
                        <Select
                            {...commonProps}
                            {...rhfField}
                            options={field.options ?? []}
                            multiple={field.multiple}
                            error={fieldState.error?.message}
                            value={
                                field.multiple
                                    ? Array.isArray(rhfField.value)
                                        ? rhfField.value
                                        : []
                                    : typeof rhfField.value === 'string'
                                        ? rhfField.value
                                        : ''
                            }
                            onChange={(e) => {
                                if (field.multiple) {
                                    const values = Array.from(e.target.selectedOptions).map(
                                        (option) => option.value
                                    );
                                    rhfField.onChange(values);
                                } else {
                                    rhfField.onChange(e.target.value);
                                }
                            }}
                        />
                    )}
                />
            );

        case 'checkbox':
            return (
                <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: rhfField, fieldState }) => (
                        <Checkbox
                            {...commonProps}
                            error={fieldState.error?.message}
                            checked={!!rhfField.value}
                            onChange={(e) => rhfField.onChange(e.target.checked)}
                            onBlur={rhfField.onBlur}
                            ref={rhfField.ref}
                        />
                    )}
                />
            );

        default:
            return null;
    }
}