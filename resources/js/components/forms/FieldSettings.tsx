import React from 'react';
import type { Field } from '@/types/forms';
import { supportedFields } from './supportedFields';

type FieldSettingsProps = {
    field: Field;
    existingNames: string[];
    onChange: (updatedField: Field) => void;
    onRemove: () => void;
    wrapperClass?: string;
    inputClass?: string;
    labelClass?: string;
    errorClass?: string;
    buttonClass?: string;
};

export default function FieldSettings({
    field,
    existingNames,
    onChange,
    onRemove,
    wrapperClass = 'space-y-4 rounded border p-4',
    inputClass = 'w-full rounded border px-3 py-2',
    labelClass = 'block text-sm font-medium mb-1',
    errorClass = 'text-sm text-red-600',
    buttonClass = 'rounded border px-3 py-2',
}: FieldSettingsProps) {
    const fieldDefinition = supportedFields[field.type];
    const otherNames = existingNames.filter((name) => name !== field.name);

    const nameError =
        !field.name.trim()
            ? 'Field name is required.'
            : otherNames.includes(field.name)
                ? 'Field name must be unique.'
                : undefined;

    function updateField<K extends keyof Field>(key: K, value: Field[K]) {
        onChange({
            ...field,
            [key]: value,
        });
    }

    function updateOption(index: number, key: 'label' | 'value', value: string) {
        const nextOptions = [...(field.options ?? [])];
        const option = nextOptions[index];

        if (!option) {
            return;
        }

        nextOptions[index] = {
            ...option,
            [key]: value,
        };

        updateField('options', nextOptions);
    }

    function addOption() {
        updateField('options', [
            ...(field.options ?? []),
            { label: '', value: '' },
        ]);
    }

    function removeOption(index: number) {
        const nextOptions = (field.options ?? []).filter((_, i) => i !== index);
        updateField('options', nextOptions);
    }

    return (
        <div className={wrapperClass}>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold">{fieldDefinition.label}</h3>
                    <p className="text-sm text-gray-500">Type: {field.type}</p>
                </div>

                <button type="button" onClick={onRemove} className={buttonClass}>
                    Remove
                </button>
            </div>

            {fieldDefinition.settings.includes('label') && (
                <div>
                    <label className={labelClass} htmlFor={`${field.name || field.type}-label`}>
                        Label
                    </label>
                    <input
                        id={`${field.name || field.type}-label`}
                        type="text"
                        className={inputClass}
                        value={field.label ?? ''}
                        required
                        onChange={(e) => updateField('label', e.target.value)}
                    />
                </div>
            )}

            {fieldDefinition.settings.includes('name') && (
                <div>
                    <label className={labelClass} htmlFor={`${field.name || field.type}-name`}>
                        Name
                    </label>
                    <input
                        id={`${field.name || field.type}-name`}
                        type="text"
                        className={inputClass}
                        value={field.name}
                        required
                        onChange={(e) => updateField('name', e.target.value)}
                    />
                    {nameError ? <p className={errorClass}>{nameError}</p> : null}
                </div>
            )}

            {fieldDefinition.settings.includes('help') && (
                <div>
                    <label className={labelClass} htmlFor={`${field.name || field.type}-help`}>
                        Help text
                    </label>
                    <input
                        id={`${field.name || field.type}-help`}
                        type="text"
                        className={inputClass}
                        value={field.help ?? ''}
                        onChange={(e) => updateField('help', e.target.value)}
                    />
                </div>
            )}

            {fieldDefinition.settings.includes('placeholder') && (
                <div>
                    <label className={labelClass} htmlFor={`${field.name || field.type}-placeholder`}>
                        Placeholder
                    </label>
                    <input
                        id={`${field.name || field.type}-placeholder`}
                        type="text"
                        className={inputClass}
                        value={field.placeholder ?? ''}
                        onChange={(e) => updateField('placeholder', e.target.value)}
                    />
                </div>
            )}

            {fieldDefinition.settings.includes('required') && (
                <div className="flex items-center gap-2">
                    <input
                        id={`${field.name || field.type}-required`}
                        type="checkbox"
                        checked={!!field.required}
                        onChange={(e) => updateField('required', e.target.checked)}
                    />
                    <label htmlFor={`${field.name || field.type}-required`} className={labelClass}>
                        Required
                    </label>
                </div>
            )}

            {fieldDefinition.settings.includes('min') && (
                <div>
                    <label className={labelClass} htmlFor={`${field.name || field.type}-min`}>
                        Min
                    </label>
                    <input
                        id={`${field.name || field.type}-min`}
                        type="number"
                        min={0}
                        className={inputClass}
                        value={field.min ?? ''}
                        onChange={(e) => {
                            const newMin = e.target.value === '' ? undefined : Number(e.target.value);

                            let newMax = field.max;

                            if (newMin !== undefined && newMax !== undefined && newMax < newMin) {
                                newMax = newMin;
                            }

                            onChange({
                                ...field,
                                min: newMin,
                                max: newMax,
                            });
                        }}
                    />
                </div>
            )}

            {fieldDefinition.settings.includes('max') && (
                <div>
                    <label className={labelClass} htmlFor={`${field.name || field.type}-max`}>
                        Max
                    </label>
                    <input
                        id={`${field.name || field.type}-max`}
                        type="number"
                        className={inputClass}
                        min={field.min ?? 0}
                        value={field.max ?? ''}
                        onChange={(e) =>
                            updateField(
                                'max',
                                e.target.value === '' ? undefined : Number(e.target.value)
                            )
                        }
                    />
                </div>
            )}

            {fieldDefinition.settings.includes('multiple') && (
                <div className="flex items-center gap-2">
                    <input
                        id={`${field.name || field.type}-multiple`}
                        type="checkbox"
                        checked={!!field.multiple}
                        onChange={(e) => updateField('multiple', e.target.checked)}
                    />
                    <label htmlFor={`${field.name || field.type}-multiple`} className={labelClass}>
                        Allow multiple selections
                    </label>
                </div>
            )}

            {fieldDefinition.settings.includes('options') && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                        <label className={labelClass}>Options</label>
                        <button type="button" onClick={addOption} className={buttonClass}>
                            Add option
                        </button>
                    </div>

                    {(field.options ?? []).map((option, index) => (
                        <div key={`${field.name}-option-${index}`} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Label"
                                value={option.label}
                                onChange={(e) => updateOption(index, 'label', e.target.value)}
                            />
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Value"
                                value={option.value}
                                onChange={(e) => updateOption(index, 'value', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => removeOption(index)}
                                className={buttonClass}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}