import React from 'react';
import type { Field, FormTemplate } from '@/types/forms';
import FieldSettings from './FieldSettings';
import { createDefaultField, supportedFieldList } from './supportedFields';
import type { SupportedFieldType } from './supportedFields';

type BuilderField = Field & {
    builderId: string;
};

type FormBuilderProps = {
    template: FormTemplate;
    onSubmit: (template: FormTemplate) => void;
    wrapperClass?: string;
    sectionClass?: string;
    inputClass?: string;
    labelClass?: string;
    errorClass?: string;
    buttonClass?: string;
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

export default function FormBuilder({
    template,
    onSubmit,
    wrapperClass = 'space-y-6',
    sectionClass = 'space-y-4 rounded border p-4',
    inputClass = 'w-full rounded border px-3 py-2',
    labelClass = 'block text-sm font-medium mb-1',
    errorClass = 'text-sm text-red-600',
    buttonClass = 'rounded border px-3 py-2',
}: FormBuilderProps) {
    const [name, setName] = React.useState(template.name);
    const [description, setDescription] = React.useState(template.description ?? '');
    const [fields, setFields] = React.useState<BuilderField[]>(
        template.schema.fields.map(createBuilderField)
    );
    const hasEmptyNames = fields.some((field) => !field.name.trim());
    const names = fields.map((f) => f.name.trim());
    const hasDuplicates = new Set(names).size !== names.length;

    const isInvalid = hasEmptyNames || hasDuplicates;

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
    }

    function addField(type: SupportedFieldType) {
        setFields((currentFields) => [
            ...currentFields,
            createBuilderField(createDefaultField(type)),
        ]);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        onSubmit({
            ...template,
            name,
            description: description || null,
            schema: {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                fields: fields.map(({ builderId, ...field }) => field),
            },
        });
    }

    return (
        <form onSubmit={handleSubmit} className={wrapperClass}>
            <div className={sectionClass}>
                <div>
                    <label htmlFor="template-name" className={labelClass}>
                        Template name
                    </label>
                    <input
                        id="template-name"
                        type="text"
                        className={inputClass}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="template-description" className={labelClass}>
                        Description
                    </label>
                    <textarea
                        id="template-description"
                        className={inputClass}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className={sectionClass}>
                <div className="flex flex-wrap gap-2">
                    {supportedFieldList.map((fieldDefinition) => (
                        <button
                            key={fieldDefinition.type}
                            type="button"
                            className={buttonClass}
                            onClick={() => addField(fieldDefinition.type)}
                        >
                            Add {fieldDefinition.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {fields.length > 0 ? (
                    fields.map((field) => (
                        <FieldSettings
                            key={field.builderId}
                            field={field}
                            existingNames={fields.map((item) => item.name)}
                            onChange={(updatedField) => updateField(field.builderId, updatedField)}
                            onRemove={() => removeField(field.builderId)}
                            wrapperClass={sectionClass}
                            inputClass={inputClass}
                            labelClass={labelClass}
                            errorClass={errorClass}
                            buttonClass={buttonClass}
                        />
                    ))
                ) : (
                    <div className={sectionClass}>No fields added yet.</div>
                )}
            </div>

            <div>
                <button type="submit" className={`${buttonClass} dark:text-white`} disabled={isInvalid}>
                    Save template
                </button>
            </div>
        </form>
    );
}