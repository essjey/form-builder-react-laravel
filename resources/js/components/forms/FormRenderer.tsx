import { useForm } from '@inertiajs/react';
import React from 'react';
import type { FormTemplate, FormValue } from '@/types/forms';
import FormField from './FormField';

type FormRendererProps = {
    template: FormTemplate;
    submitLabel?: string;
    formClass?: string;
    fieldWrapperClass?: string;
    labelClass?: string;
    helpClass?: string;
    errorClass?: string;
    inputClass?: string;
    submitClass?: string;
};

export default function FormRenderer({
    template,
    submitLabel = 'Submit',
    formClass = 'space-y-6',
    fieldWrapperClass = '',
    labelClass = 'block text-sm font-medium mb-1',
    helpClass = 'mt-1 text-sm text-gray-500',
    errorClass = 'mt-1 text-sm text-red-600',
    inputClass = 'w-full rounded border px-3 py-2',
    submitClass = 'rounded bg-black px-4 py-2 text-white',
}: FormRendererProps) {
    const initialData = template.schema.fields.reduce<Record<string, FormValue>>((acc, field) => {
        if (field.type === 'checkbox') {
            acc[field.name] = false;
        } else if (field.type === 'select' && field.multiple) {
            acc[field.name] = [];
        } else {
            acc[field.name] = '';
        }

        return acc;
    }, {});

    const { data, setData, post, processing, errors } = useForm(initialData);

    function handleChange(name: string, value: FormValue) {
        setData(name, value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(`/templates/${template.id}/submissions`);
    }

    return (
        <form onSubmit={handleSubmit} className={formClass} noValidate>
            {template.schema.fields.map((field) => (
                <div key={field.name} className={fieldWrapperClass}>
                    <FormField
                        field={field}
                        value={data[field.name]}
                        error={errors[field.name]}
                        onChange={handleChange}
                        labelClass={labelClass}
                        helpClass={helpClass}
                        errorClass={errorClass}
                        inputClass={inputClass}
                    />
                </div>
            ))}

            <div>
                <button type="submit" className={submitClass} disabled={processing}>
                    {processing ? 'Submitting...' : submitLabel}
                </button>
            </div>
        </form>
    );
}