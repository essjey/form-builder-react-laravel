/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, router } from '@inertiajs/react';
import React from 'react';
import BuilderFieldCard from '@/components/forms/builder/BuilderFieldCard';
import BuilderWorkspace from '@/components/forms/builder/BuilderWorkspace';
import FieldLibraryPanel from '@/components/forms/builder/FieldLibraryPanel';
import FieldPropertiesPanel from '@/components/forms/builder/FieldPropertiesPanel';
// import FormBuilder from '@/components/forms/FormBuilder';
import type { SupportedFieldType } from '@/components/forms/supportedFields';
import { createDefaultField } from '@/components/forms/supportedFields';
import * as templates from '@/routes/templates';
import type { Field, FormTemplate } from '@/types/forms';

type BuilderField = Field & {
    builderId: string;
};

type Props = {
    template: FormTemplate;
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

export default function Edit({ template }: Props) {
    const [name, setName] = React.useState(template.name);
    const [description, setDescription] = React.useState(template.description ?? '');
    const [saveMessage, setSaveMessage] = React.useState<string | null>(null);

    const [fields, setFields] = React.useState<BuilderField[]>(
        template.schema.fields.map(createBuilderField)
    );

    const [selectedFieldName, setSelectedFieldName] = React.useState<string | null>(
        template.schema.fields[0]?.name ?? null
    );

    React.useEffect(() => {
        setName(template.name);
        setDescription(template.description ?? '');
        setFields(template.schema.fields.map(createBuilderField));
    }, [template.id, template.name, template.description, template.schema]);

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

        setSaveMessage(null);

        router.put(
            `/templates/${template.id}`,
            {
                ...template,
                name,
                description: description || null,
                schema: {
                    fields: fields.map(({ builderId, ...field }) => field),
                },
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setSaveMessage('Saved!');

                    window.setTimeout(() => {
                        setSaveMessage(null);
                    }, 2500);
                },
            }
        );
    }

    const selectedField =
        fields.find((field) => field.name === selectedFieldName) ?? null;

    return (
        <>
            <Head title={`Edit ${template.name}`} />

            <BuilderWorkspace
                sidebar={
                    <FieldLibraryPanel
                        onAddField={addField}
                    />
                }
                // canvas={
                //     <FormBuilder
                //         name={name}
                //         description={description}
                //         fields={fields}
                //         selectedFieldName={selectedFieldName}
                //         onNameChange={setName}
                //         onDescriptionChange={setDescription}
                //         onSelectField={setSelectedFieldName}
                //         onSubmit={handleSubmit}
                //     />
                // }
                canvas={
                    <div className="space-y-4">
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
                    </div>
                }
                properties={
                    <FieldPropertiesPanel
                        selectedField={selectedField}
                        existingNames={fields.map((field) => field.name)}
                        onSave={handleSubmit}
                        saveMessage={saveMessage}
                        saveDisabled={!name.trim()}
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

Edit.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
        { title: 'Edit', href: '#' },
    ],
};