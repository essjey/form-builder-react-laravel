import { Copy, Trash2 } from 'lucide-react';
import CheckboxInput from '@/components/forms/CheckboxInput';
import EmailInput from '@/components/forms/EmailInput';
import SelectInput from '@/components/forms/SelectInput';
import SelectSearchInput from '@/components/forms/SelectSearchInput';
import TextareaInput from '@/components/forms/TextareaInput';
import TextInput from '@/components/forms/TextInput';
import { cn } from '@/lib/utils';
import type { Field } from '@/types/forms';

type BuilderFieldCardProps = {
    field: Field;
    selected?: boolean;
    onClick?: () => void;
};

export default function BuilderFieldCard({
    field,
    selected = false,
    onClick,
}: BuilderFieldCardProps) {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }}
            className={cn(
                'group relative w-full rounded-2xl border bg-surface-container-low text-left transition-all',
                selected
                    ? 'border-primary shadow-sm ring-1 ring-primary'
                    : 'border-outline-variant hover:border-outline',
            )}
        >
            {selected && (
                <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Selected
                </div>
            )}

            <div className="space-y-6 p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="truncate text-xl font-semibold text-foreground">
                                {field.label || 'Untitled Field'}
                            </h3>

                            {field.required && (
                                <span className="text-sm font-semibold text-primary">
                                    *
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {renderFieldPreview(field, selected)}

                {selected && (
                    <div className="flex items-center justify-end gap-3 text-muted-foreground">
                        <button
                            type="button"
                            className="rounded p-1 transition-colors hover:bg-surface-container-high hover:text-foreground"
                            aria-label="Duplicate field"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Copy className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            className="rounded p-1 transition-colors hover:bg-surface-container-high hover:text-destructive"
                            aria-label="Delete field"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function renderFieldPreview(field: Field, selected: boolean) {
    const inputClass = cn(
        'pointer-events-none w-full rounded-xl border bg-background px-4 py-3 text-lg text-foreground',
        selected ? 'border-primary' : 'border-outline-variant',
    );

    const labelClass = '';

    const commonProps = {
        id: `preview-${field.name}`,
        name: `preview-${field.name}`,
        label: field.label,
        help: field.help,
        labelClass,
        inputClass,
    };

    switch (field.type) {
        case 'text':
            return (
                <TextInput
                    {...commonProps}
                    type="text"
                    placeholder={field.placeholder || 'Input field'}
                    readOnly
                    tabIndex={-1}
                />
            );

        case 'email':
            return (
                <EmailInput
                    {...commonProps}
                    placeholder={field.placeholder || 'example@domain.com'}
                    readOnly
                    tabIndex={-1}
                />
            );

        case 'date':
            return (
                <TextInput
                    {...commonProps}
                    type="date"
                    readOnly
                    tabIndex={-1}
                />
            );

        case 'textarea':
            return (
                <TextareaInput
                    {...commonProps}
                    placeholder={field.placeholder || 'Textarea field'}
                    readOnly
                    tabIndex={-1}
                    className={cn(inputClass, 'min-h-32')}
                />
            );

        case 'checkbox':
            return (
                <CheckboxInput
                    {...commonProps}
                    checked={false}
                    disabled
                    tabIndex={-1}
                />
            );

        case 'select':
            return (
                <SelectInput
                    {...commonProps}
                    options={field.options ?? []}
                    value=""
                    disabled
                    tabIndex={-1}
                />
            );

        case 'selectsearch':
            return (
                <SelectSearchInput
                    {...commonProps}
                    options={field.options ?? []}
                    value=""
                    onChange={() => { }}
                    disabled
                    tabIndex={-1}
                />
            );

        default:
            return null;
    }
}