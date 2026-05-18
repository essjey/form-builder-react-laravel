import * as Dialog from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import React from 'react';
import { supportedFieldList } from '@/components/forms/supportedFields';
import type { SupportedFieldType } from '@/components/forms/supportedFields';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AddFieldCardProps = {
    onAddField: (type: SupportedFieldType) => void;
    className?: string;
};

export default function AddFieldCard({
    onAddField,
    className,
}: AddFieldCardProps) {
    const [open, setOpen] = React.useState(false);

    function handleAddField(type: SupportedFieldType) {
        onAddField(type);
        setOpen(false);
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button
                    type="button"
                    className={cn(
                        'group flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-outline-variant bg-surface-container-low px-6 py-12 transition-colors',
                        'hover:border-primary hover:bg-surface-container',
                        className
                    )}
                >
                    <div
                        className={cn(
                            'flex h-14 w-14 items-center justify-center rounded-full border border-outline-variant bg-background transition-colors',
                            'group-hover:border-primary'
                        )}
                    >
                        <Plus className="h-6 w-6 text-primary" />
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-body-md font-semibold text-on-surface">
                            Add field
                        </p>

                        <p className="mt-1 text-sm text-on-surface-variant">
                            Add a new form element
                        </p>
                    </div>
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

                <Dialog.Content
                    className={cn(
                        'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
                        'rounded-2xl border border-outline-variant bg-background shadow-2xl',
                        'p-6 focus:outline-none'
                    )}
                >
                    <div className="mb-6">
                        <Dialog.Title className="text-headline-md text-on-surface">
                            Add Field
                        </Dialog.Title>

                        <Dialog.Description className="mt-1 text-body-md text-on-surface-variant">
                            Choose a field type to add to the form.
                        </Dialog.Description>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {supportedFieldList.map((fieldDefinition) => (
                            <Button
                                key={fieldDefinition.type}
                                type="button"
                                variant="outline"
                                className="justify-start"
                                onClick={() =>
                                    handleAddField(fieldDefinition.type)
                                }
                            >
                                {fieldDefinition.label}
                            </Button>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Dialog.Close asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}