import { Head, router } from '@inertiajs/react';
import React from 'react';
import AddFieldCard from '@/components/forms/builder/AddFieldCard';
import BuilderFieldCard from '@/components/forms/builder/BuilderFieldCard';
import BuilderWorkspace from '@/components/forms/builder/BuilderWorkspace';
import FieldPropertiesPanel from '@/components/forms/builder/FieldPropertiesPanel';
import FormStructurePanel from '@/components/forms/builder/FormStructurePanel';
import type { SupportedFieldType } from '@/components/forms/supportedFields';
import { createDefaultField } from '@/components/forms/supportedFields';
import {
    createBuilderField,
    buildTemplatePayload

} from '@/lib/formBuilder';
import type { BuilderField } from '@/lib/formBuilder';
import * as templates from '@/routes/templates';
import type { Field } from '@/types/forms';



export default function Create() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [fields, setFields] = React.useState<BuilderField[]>([]);
    const [selectedFieldName, setSelectedFieldName] = React.useState<string | null>(null);
    const [mobileMode, setMobileMode] = React.useState<'build' | 'structure' | 'properties'>('build');

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

        router.post('/templates', buildTemplatePayload({}, name, description, fields));
    }

    const selectedField =
        fields.find((field) => field.name === selectedFieldName) ?? null;

    return (
        <>
            <Head title="Create Form" />

            <BuilderWorkspace
                mobileMode={mobileMode}
                onMobileModeChange={setMobileMode}
                sidebar={
                    <FormStructurePanel
                        fields={fields}
                        selectedFieldName={selectedFieldName}
                        onSelectField={setSelectedFieldName}
                        onReorderFields={setFields}
                    />
                }
                canvas={
                    <div className="space-y-6">
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

                        <AddFieldCard onAddField={addField} />
                    </div>
                }
                properties={
                    <FieldPropertiesPanel
                        selectedField={selectedField}
                        existingNames={fields.map((field) => field.name)}
                        onSave={handleSubmit}
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

Create.layout = {
    breadcrumbs: [
        { title: 'Forms', href: templates.index() },
        { title: 'Create', href: templates.create() },
    ],
};