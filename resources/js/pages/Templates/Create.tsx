import { Head, router } from '@inertiajs/react';
import FormBuilder from '@/components/forms/FormBuilder';
import * as templates from '@/routes/templates';
import type { FormTemplate } from '@/types/forms';

const emptyTemplate: FormTemplate = {
    id: 0,
    name: '',
    description: '',
    schema: {
        fields: [],
    },
    created_at: '',
};

export default function Create() {
    function handleSubmit(template: FormTemplate) {
        router.post('/templates', template);
    }

    return (
        <>
            <Head title="Create Form" />

            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Create Form
                    </h1>
                    <p className="text-gray-600">
                        Build a new form template.
                    </p>
                </div>

                <FormBuilder
                    template={emptyTemplate}
                    onSubmit={handleSubmit}
                    wrapperClass="space-y-6"
                    sectionClass="space-y-4 rounded-lg border border-gray-200 bg-white p-4"
                    inputClass="w-full rounded border border-gray-300 px-3 py-2 dark:text-gray-900"
                    labelClass="block text-sm font-medium text-gray-900 mb-1"
                    errorClass="text-sm text-red-600"
                    buttonClass="rounded border border-gray-300 px-3 py-2 text-sm dark:text-gray-900"
                />
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
        { title: 'Create', href: templates.create() },
    ],
};