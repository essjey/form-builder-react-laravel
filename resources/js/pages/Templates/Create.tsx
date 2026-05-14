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
                    <h1 className="text-3xl font-bold">
                        Create Form
                    </h1>
                    <p className="">
                        Build a new form template.
                    </p>
                </div>

                <FormBuilder
                    template={emptyTemplate}
                    onSubmit={handleSubmit}
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