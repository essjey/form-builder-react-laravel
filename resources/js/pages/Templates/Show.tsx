import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import FormRenderer from '@/components/forms/FormRenderer';
import { Button } from '@/components/ui/button';
import * as templates from '@/routes/templates';
import type { FormTemplate } from '@/types/forms';

interface Props {
    template: FormTemplate;
}

export default function Show({ template }: Props) {
    return (
        <>
            <Head title={template.name} />

            <div className="mx-auto max-w-5xl w-full px-6 py-8">
                <div className="overflow-hidden rounded-3xl border border-outline-variant bg-background shadow-xl">
                    <div className="relative h-56 border-b border-outline-variant bg-primary-container">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />

                        <div className="absolute bottom-8 left-8">
                            <h1 className="text-3xl font-semibold text-on-primary-container">
                                {template.name}
                            </h1>

                            {template.description ? (
                                <p className="mt-2 max-w-2xl text-body-md text-on-primary-container/80">
                                    {template.description}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="bg-surface-container-lowest px-8 py-10">
                        <div className="flex justify-end">
                            <Button asChild variant="outline">
                                <Link href={`/templates/${template.id}/edit`}>
                                    <Pencil className="h-4 w-4" />
                                    Edit Form
                                </Link>
                            </Button>
                        </div>
                        <FormRenderer
                            template={template}
                            formClass="space-y-10"
                            fieldWrapperClass="space-y-2"
                            labelClass="block text-label-md font-medium text-on-surface"
                            helpClass="mt-1 text-sm text-on-surface-variant"
                            errorClass="mt-1 text-sm text-error"
                            inputClass="rounded-xl border border-outline-variant px-4 py-3 text-body-md text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            submitClass="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                            errorSummaryClass="rounded-2xl border border-error bg-error-container p-4 text-on-error-container"
                            errorSummaryListClass="mt-2 space-y-1"
                            errorSummaryItemClass="text-sm"
                            errorSummaryLinkClass="underline"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
        { title: 'View', href: '#' },
    ],
};