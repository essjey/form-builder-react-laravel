import { Head, Link, router } from '@inertiajs/react';
import { Clock3, Eye, FileText, Pencil, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as templates from '@/routes/templates';
import type { FormTemplate } from '@/types/forms';

type Props = {
    templates: FormTemplate[];
};

export default function Index({ templates }: Props) {
    const [query, setQuery] = React.useState('');
    const [sortBy, setSortBy] = React.useState<'newest' | 'oldest' | 'name' | 'fields'>('newest');

    const filteredTemplates = templates
        .filter((template) => {
            const search = query.toLowerCase();

            return (
                template.name.toLowerCase().includes(search) ||
                (template.description ?? '').toLowerCase().includes(search)
            );
        })
        .sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }

            if (sortBy === 'fields') {
                return b.schema.fields.length - a.schema.fields.length;
            }

            const aDate = new Date(a.created_at).getTime();
            const bDate = new Date(b.created_at).getTime();

            return sortBy === 'newest' ? bDate - aDate : aDate - bDate;
        });

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
            <Head title="Forms" />

            <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-headline-lg text-on-surface">
                            Existing Forms
                        </h1>

                        <p className="mt-2 text-body-md text-on-surface-variant">
                            Manage and organize your data collection assets.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="search"
                                value={query}
                                placeholder="Search forms..."
                                className="rounded-lg border border-input bg-background px-4 py-2 text-sm"
                                onChange={(e) => setQuery(e.target.value)}
                            />

                            <select
                                value={sortBy}
                                className="rounded-lg border border-input bg-background px-4 py-2 text-sm"
                                onChange={(e) =>
                                    setSortBy(e.target.value as 'newest' | 'oldest' | 'name' | 'fields')
                                }
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="name">Name</option>
                                <option value="fields">Most fields</option>
                            </select>

                            <Button asChild className="rounded-full">
                                <Link href="/templates/create">
                                    <Plus className="h-4 w-4" />
                                    Create New Form
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {filteredTemplates.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {filteredTemplates.map((template) => (
                            <article
                                key={template.id}
                                className={cn(
                                    'group flex min-h-64 flex-col justify-between rounded-2xl border border-outline-variant',
                                    'bg-surface-container-lowest p-6 transition-all',
                                    'hover:border-primary hover:shadow-lg'
                                )}
                            >
                                <div className="space-y-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
                                            <FileText className="h-5 w-5" />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(template)}
                                            className="rounded-lg p-2 text-on-surface-variant opacity-0 transition hover:bg-error-container hover:text-on-error-container group-hover:opacity-100"
                                            aria-label={`Delete ${template.name}`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="line-clamp-2 text-xl font-semibold text-on-surface">
                                            {template.name}
                                        </h2>

                                        <p className="line-clamp-2 text-sm text-on-surface-variant">
                                            {template.description || 'No description added.'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="border-t border-outline-variant pt-4">
                                        <div className="flex items-center justify-between gap-4 text-xs font-semibold text-on-surface-variant">
                                            <span className="flex items-center gap-1">
                                                <FileText className="h-3.5 w-3.5" />
                                                {template.schema.fields.length} field
                                                {template.schema.fields.length === 1 ? '' : 's'}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Clock3 className="h-3.5 w-3.5" />
                                                {new Date(template.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/templates/${template.id}`}>
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Link>
                                        </Button>

                                        <Button asChild size="sm">
                                            <Link href={`/templates/${template.id}/edit`}>
                                                <Pencil className="h-4 w-4" />
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest p-12 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                            <Plus className="h-6 w-6" />
                        </div>

                        <h2 className="mt-4 text-headline-md text-on-surface">
                            No forms yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-body-md text-on-surface-variant">
                            Create your first form template and start building reusable form workflows.
                        </p>

                        <Button asChild className="mt-6 rounded-full">
                            <Link href="/templates/create">
                                <Plus className="h-4 w-4" />
                                Create New Form
                            </Link>
                        </Button>
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