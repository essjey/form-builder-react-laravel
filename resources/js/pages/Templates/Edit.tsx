import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import FormBuilder from '@/components/forms/FormBuilder';
import type { FormTemplate } from '@/types/forms';

type Props = {
    template: FormTemplate;
};

export default function Edit({ template }: Props) {
    function handleSubmit(updatedTemplate: FormTemplate) {
        router.put(`/templates/${template.id}`, updatedTemplate);
    }

    return (
        <>
            <Head title={`Edit ${template.name}`} />

            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Edit Template
                    </h1>
                    <p className="text-gray-600">
                        Update the template settings and supported fields.
                    </p>
                </div>

                <FormBuilder
                    template={template}
                    onSubmit={handleSubmit}
                    wrapperClass="space-y-6"
                    sectionClass="space-y-4 rounded-lg border border-gray-200 bg-white p-4"
                    inputClass="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                    labelClass="block text-sm font-medium text-gray-900 mb-1"
                    errorClass="text-sm text-red-600"
                    buttonClass="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
            </div>
        </>
    );
}