import { router } from '@inertiajs/react';
import React from 'react';
import { useForm } from 'react-hook-form';
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
    errorSummaryClass?: string;
    errorSummaryListClass?: string;
    errorSummaryItemClass?: string;
    errorSummaryLinkClass?: string;
};

type FormValues = Record<string, FormValue>;

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
    errorSummaryClass = 'rounded border border-red-300 bg-red-50 p-4',
    errorSummaryListClass = 'mt-2 list-none pl-0',
    errorSummaryItemClass = '',
    errorSummaryLinkClass = 'text-red-700 underline',
}: FormRendererProps) {
    const defaultValues = template.schema.fields.reduce<FormValues>((acc, field) => {
        if (field.type === 'checkbox') {
            acc[field.name] = false;
        } else if (field.type === 'select' && field.multiple) {
            acc[field.name] = [];
        } else {
            acc[field.name] = '';
        }

        return acc;
    }, {});

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        defaultValues,
    });

    const fieldsWithErrors = template.schema.fields.filter((field) => errors[field.name]);

    function onSubmit(formData: FormValues) {
        router.post(`/templates/${template.id}/submissions`, formData, {
            onSuccess: () => reset(),
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
            {fieldsWithErrors.length > 0 && (
                <div className={errorSummaryClass} role="alert" aria-labelledby="form-errors-title">
                    <h2 id="form-errors-title" className="font-semibold text-gray-900">
                        Please correct the following errors:
                    </h2>

                    <ul className={errorSummaryListClass}>
                        {fieldsWithErrors.map((field) => (
                            <li key={field.name} className={errorSummaryItemClass}>
                                <a href={`#${field.name}`} className={errorSummaryLinkClass}>
                                    {field.label ?? field.name}: {errors[field.name]?.message as string}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {template.schema.fields.map((field) => {
                if (!field.name) {
                    return null;
                }

                return (
                    <div key={field.name} className={fieldWrapperClass}>
                        <FormField
                            field={field}
                            register={register}
                            error={errors[field.name]?.message as string | undefined}
                            labelClass={labelClass}
                            helpClass={helpClass}
                            errorClass={errorClass}
                            inputClass={inputClass}
                        />
                    </div>
                );
            })}

            <div>
                <button type="submit" className={submitClass} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : submitLabel}
                </button>
            </div>
        </form>
    );
}