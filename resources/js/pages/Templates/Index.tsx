import { Head, Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import * as templates from '@/routes/templates';
import type { FormTemplate } from '@/types/forms';

type Props = {
    templates: FormTemplate[];
};

export default function Index({ templates }: Props) {
    function handleDelete(template: FormTemplate) {
        const confirmed = window.confirm(
            `Delete "${template.name}"? This can be restored later if you build a trash view.`
        );

        if (!confirmed) {
            return;
        }

        router.delete(`/templates/${template.id}`);
    }

    return (
        <>
            <Head title="Form Templates" />

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Form Templates
                        </h1>
                        <p className="text-gray-600">
                            View and manage your form templates.
                        </p>
                    </div>

                    <Link
                        href="/templates/create"
                        className="rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                        Create Form
                    </Link>
                </div>

                {templates.length > 0 ? (
                    <div className="space-y-4">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="relative rounded-lg border border-gray-200 bg-white p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {template.name}
                                        </h2>

                                        {template.description ? (
                                            <p className="text-gray-600">
                                                {template.description}
                                            </p>
                                        ) : null}

                                        <p className="text-sm text-gray-500">
                                            {template.schema.fields.length} field
                                            {template.schema.fields.length === 1 ? '' : 's'}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/templates/${template.id}`}
                                            className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={`/templates/${template.id}/edit`}
                                            className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(template)}
                                            className="rounded border border-red-300 p-2 text-red-600 hover:bg-red-50"
                                            aria-label={`Delete ${template.name}`}
                                            title="Delete form"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
                        <svg viewBox="0 0 500 100" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Empty field placeholder">
                            <rect x="1" y="1" width="498" height="98" rx="3" fill="#FAFAFA" stroke="#D4D4D8" strokeDasharray="6 6" />
                            <rect x="24" y="20" width="140" height="12" rx="6" fill="#E4E4E7" />
                            <rect x="24" y="42" width="452" height="16" rx="8" fill="#F4F4F5" stroke="#E4E4E7" />
                            <rect x="24" y="70" width="220" height="10" rx="5" fill="#E4E4E7" />
                        </svg>
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
    ],
};