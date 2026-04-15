import { Head } from '@inertiajs/react';
import FormRenderer from '@/components/forms/FormRenderer';
import * as templates from '@/routes/templates';
import type { FormTemplate } from '@/types/forms';

interface Props {
    template: FormTemplate;
}

export default function Show({ template }: Props) {
    const formattedDate = new Date(template.created_at).toLocaleDateString();

    return (
        <>
            <Head title={template.name} />

            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">
                    {template.name}
                </h1>

                {template.description ? (
                    <p className="text-gray-600 mb-6">{template.description}</p>
                ) : null}

                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500 mb-6">
                    Created on {formattedDate}
                </div>

                <FormRenderer
                    template={template}
                    formClass="space-y-6"
                    fieldWrapperClass="space-y-1"
                    labelClass="block text-sm font-medium text-gray-900 dark:text-white"
                    helpClass="text-sm text-gray-500"
                    errorClass="text-sm text-red-600"
                    inputClass="w-full rounded border border-gray-300 px-3 py-2"
                    submitClass="rounded bg-black px-4 py-2 text-white"
                />
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
        { title: 'View', href: '#' }
    ],
};