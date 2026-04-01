import { Head } from '@inertiajs/react';

interface FormTemplate {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

interface Props {
    template: FormTemplate;
}


export default function Show({ template }: Props) {

    const formTemp = JSON.stringify(template, null, 2);
    const formattedDate = new Date(template.created_at).toLocaleDateString();

    return (
        <>
            <Head title={template.name} />
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">
                    {template.name}
                </h1>
                {
                    template.description
                        ? <p className="text-gray-600 mb-6">{template.description}</p>
                        : null
                }
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
                    Created on {formattedDate}
                </div>
                <pre>
                    {formTemp}
                </pre>
            </div>
        </>
    );
}