import { Head, router } from '@inertiajs/react';
import React from 'react';
import BuilderFieldCard from '@/components/forms/builder/BuilderFieldCard';
import BuilderWorkspace from '@/components/forms/builder/BuilderWorkspace';
import FieldLibraryPanel from '@/components/forms/builder/FieldLibraryPanel';
import FieldPropertiesPanel from '@/components/forms/builder/FieldPropertiesPanel';
import type { SupportedFieldType } from '@/components/forms/supportedFields';
import { createDefaultField } from '@/components/forms/supportedFields';
import { Button } from '@/components/ui/button';
import * as templates from '@/routes/templates';
import type { Field } from '@/types/forms';

type BuilderField = Field & {
    builderId: string;
};

function generateId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createBuilderField(field: Field): BuilderField {
    return {
        ...field,
        builderId: generateId(),
    };
}

export default function Create() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [fields, setFields] = React.useState<BuilderField[]>([]);
    const [selectedFieldName, setSelectedFieldName] = React.useState<string | null>(null);

    function updateField(builderId: string, updatedField: Field) {
        setFields((currentFields) =>
            currentFields.map((field) =>
                field.builderId === builderId
                    ? { ...updatedField, builderId: field.builderId }
                    : field
            )
        );
    }

    function removeField(builderId: string) {
        setFields((currentFields) =>
            currentFields.filter((field) => field.builderId !== builderId)
        );

        setSelectedFieldName(null);
    }

    function addField(type: SupportedFieldType) {
        const newField = createBuilderField(createDefaultField(type));

        setFields((currentFields) => [...currentFields, newField]);
        setSelectedFieldName(newField.name);
    }

    function handleSubmit() {
        if (!name.trim()) {
            return;
        }

        router.post('/templates', {
            name,
            description: description || null,
            schema: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                fields: fields.map(({ builderId, ...field }) => field),
            },
        });
    }

    const selectedField =
        fields.find((field) => field.name === selectedFieldName) ?? null;

    return (
        <>
            <Head title="Create Form" />

            <BuilderWorkspace
                sidebar={<FieldLibraryPanel onAddField={addField} />}
                canvas={
                    <div className="space-y-4">
                        <div className="rounded-xl border border-border bg-surface-container-low p-6">
                            <label htmlFor="template-name" className="block text-label-md">
                                Form name
                            </label>

                            <input
                                id="template-name"
                                type="text"
                                value={name}
                                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label
                                htmlFor="template-description"
                                className="mt-4 block text-label-md"
                            >
                                Description
                            </label>

                            <textarea
                                id="template-description"
                                value={description}
                                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {fields.length > 0 ? (
                            fields.map((field) => (
                                <BuilderFieldCard
                                    key={field.builderId}
                                    field={field}
                                    selected={field.name === selectedFieldName}
                                    onClick={() => setSelectedFieldName(field.name)}
                                />
                            ))
                        ) : (
                            <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
                                No fields added yet.
                            </div>
                        )}

                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!name.trim()}
                            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                        >
                            Create form
                        </Button>
                    </div>
                }
                properties={
                    <FieldPropertiesPanel
                        selectedField={selectedField}
                        existingNames={fields.map((field) => field.name)}
                        onChange={(updatedField) => {
                            if (!selectedField) {
                                return;
                            }

                            updateField(selectedField.builderId, updatedField);

                            if (selectedField.name !== updatedField.name) {
                                setSelectedFieldName(updatedField.name);
                            }
                        }}
                        onRemove={() => {
                            if (!selectedField) {
                                return;
                            }

                            removeField(selectedField.builderId);
                        }}
                    />
                }
            />
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
        { title: 'Create', href: templates.create() },
    ],
};