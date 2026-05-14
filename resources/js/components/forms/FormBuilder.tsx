import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Field } from '@/types/forms';
import FieldSettings from './FieldSettings';

type BuilderField = Field & {
    builderId: string;
};

type FormBuilderProps = {
    name: string;
    description: string;
    fields: BuilderField[];
    selectedFieldName?: string | null;

    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSelectField?: (fieldName: string) => void;
    onSubmit: () => void;
};

export default function FormBuilder({
    name,
    description,
    fields,
    selectedFieldName,
    onNameChange,
    onDescriptionChange,
    onSelectField,
    onSubmit,
}: FormBuilderProps) {
    const hasEmptyNames = fields.some((field) => !field.name.trim());

    const names = fields.map((f) => f.name.trim());

    const hasDuplicates = new Set(names).size !== names.length;

    const isInvalid = hasEmptyNames || hasDuplicates;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="grid grid-cols-1 gap-4"
            noValidate
        >
            <div>
                <label htmlFor="template-name" className="w-full">
                    Template name
                </label>

                <input
                    id="template-name"
                    type="text"
                    value={name}
                    className="w-full"
                    onChange={(e) => onNameChange(e.target.value)}
                />

                <label htmlFor="template-description" className="w-full">
                    Description
                </label>

                <textarea
                    id="template-description"
                    className="w-full"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {fields.length > 0 ? (
                    fields.map((field) => (
                        <div
                            key={field.builderId}
                            onClick={() => onSelectField?.(field.name)}
                            className={cn(
                                'rounded-lg border transition-colors',
                                field.name === selectedFieldName
                                    ? 'border-primary-container bg-surface-container-high'
                                    : 'border-border bg-surface-container',
                            )}
                        >
                            <FieldSettings
                                field={field}
                                existingNames={fields.map((item) => item.name)}
                                readOnly
                            />
                        </div>
                    ))
                ) : (
                    <div>No fields added yet.</div>
                )}
            </div>

            <div>
                <Button type="submit" disabled={isInvalid}>
                    Save template
                </Button>
            </div>
        </form>
    );
}