import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import React from 'react';
import BuilderWorkspace from '@/components/forms/builder/BuilderWorkspace';
import FieldLibraryPanel from '@/components/forms/builder/FieldLibraryPanel';
import FieldPropertiesPanel from '@/components/forms/builder/FieldPropertiesPanel';
import FormBuilder from '@/components/forms/FormBuilder';
import * as templates from '@/routes/templates';
import type { FormTemplate } from '@/types/forms';

type Props = {
    template: FormTemplate;
};

export default function Edit({ template }: Props) {
    function handleSubmit(updatedTemplate: FormTemplate) {
        router.put(`/templates/${template.id}`, updatedTemplate);
    }

    const [selectedFieldName, setSelectedFieldName] = React.useState<string | null>(
        template.schema.fields[0]?.name ?? null
    );

    return (
        <>
            <Head title={`Edit ${template.name}`} />

            {/* <div className="max-w-3xl mx-auto px-4 py-8 space-y-6"> */}
            {/* <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Editing {template.name}
                    </h1>
                    <p className="text-gray-600">
                        Update the template settings and supported fields.
                    </p>
                </div> */}

            {/* <FormBuilder
                    template={template}
                    onSubmit={handleSubmit}
                /> */}

            <BuilderWorkspace
                sidebar={<FieldLibraryPanel />}
                canvas={
                    <FormBuilder
                        template={template}
                        onSubmit={handleSubmit}
                        selectedFieldName={selectedFieldName}
                        onSelectField={setSelectedFieldName}
                    />
                }
                properties={
                    <FieldPropertiesPanel
                        template={template}
                        selectedFieldName={selectedFieldName}
                    />
                }
            />
            {/* </div> */}
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
        { title: 'Edit', href: '#' }
    ],
};