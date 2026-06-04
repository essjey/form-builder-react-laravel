import React from 'react';
import SwitchInput from '@/components/forms/SwitchInput';
import { Button } from '@/components/ui/button';
import type { Field } from '@/types/forms';
import { supportedFields } from './supportedFields';

type FieldSettingsProps = {
    field: Field;
    existingNames: string[];
    onChange?: (updatedField: Field) => void;
    onRemove?: () => void;
    readOnly?: boolean;
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
    readOnly = false,
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
        if (!onChange) {
            return;
        }

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

                    <p className="text-sm text-gray-500">
                        Type: {field.type}
                    </p>
                </div>

                {!readOnly && onRemove && (
                    <Button
                        type="button"
                        onClick={onRemove}
                        className={buttonClass}
                        variant="secondary"
                    >
                        Remove
                    </Button>
                )}
            </div>

            {fieldDefinition.settings.includes('label') && (
                <>
                    <label
                        className={labelClass}
                        htmlFor={`${field.name || field.type}-label`}
                    >
                        Label
                    </label>

                    <input
                        id={`${field.name || field.type}-label`}
                        type="text"
                        className={inputClass}
                        value={field.label ?? ''}
                        required
                        readOnly={readOnly}
                        onChange={(e) => updateField('label', e.target.value)}
                    />
                </>
            )}

            {fieldDefinition.settings.includes('name') && (
                <>
                    <label
                        className={labelClass}
                        htmlFor={`${field.name || field.type}-name`}
                    >
                        Name
                    </label>

                    <input
                        id={`${field.name || field.type}-name`}
                        type="text"
                        className={inputClass}
                        value={field.name}
                        required
                        readOnly={readOnly}
                        onChange={(e) => updateField('name', e.target.value)}
                    />

                    {nameError ? (
                        <p className={errorClass}>{nameError}</p>
                    ) : null}
                </>
            )}

            {fieldDefinition.settings.includes('help') && (
                <>
                    <label
                        className={labelClass}
                        htmlFor={`${field.name || field.type}-help`}
                    >
                        Help text
                    </label>

                    <input
                        id={`${field.name || field.type}-help`}
                        type="text"
                        className={inputClass}
                        value={field.help ?? ''}
                        readOnly={readOnly}
                        onChange={(e) => updateField('help', e.target.value)}
                    />
                </>
            )}

            {fieldDefinition.settings.includes('placeholder') && (
                <>
                    <label
                        className={labelClass}
                        htmlFor={`${field.name || field.type}-placeholder`}
                    >
                        Placeholder
                    </label>

                    <input
                        id={`${field.name || field.type}-placeholder`}
                        type="text"
                        className={inputClass}
                        value={field.placeholder ?? ''}
                        readOnly={readOnly}
                        onChange={(e) =>
                            updateField('placeholder', e.target.value)
                        }
                    />
                </>
            )}

            {fieldDefinition.settings.includes('required') && (
                <SwitchInput
                    id={`${field.name || field.type}-required`}
                    checked={!!field.required}
                    disabled={readOnly}
                    label="Required"
                    help="Force user to fill this field"
                    labelClass={labelClass}
                    helpClass="text-sm text-on-surface-variant"
                    errorClass={errorClass}
                    onCheckedChange={(checked) => updateField('required', checked)}
                />
            )}

            {fieldDefinition.settings.includes('min') && (
                <>
                    <label
                        className={labelClass}
                        htmlFor={`${field.name || field.type}-min`}
                    >
                        Min
                    </label>

                    <input
                        id={`${field.name || field.type}-min`}
                        type="number"
                        min={0}
                        className={inputClass}
                        value={field.min ?? ''}
                        readOnly={readOnly}
                        onChange={(e) => {
                            const newMin =
                                e.target.value === ''
                                    ? undefined
                                    : Number(e.target.value);

                            let newMax = field.max;

                            if (
                                newMin !== undefined &&
                                newMax !== undefined &&
                                newMax < newMin
                            ) {
                                newMax = newMin;
                            }

                            if (!onChange) {
                                return;
                            }

                            onChange({
                                ...field,
                                min: newMin,
                                max: newMax,
                            });
                        }}
                    />
                </>
            )}

            {fieldDefinition.settings.includes('max') && (
                <>
                    <label
                        className={labelClass}
                        htmlFor={`${field.name || field.type}-max`}
                    >
                        Max
                    </label>

                    <input
                        id={`${field.name || field.type}-max`}
                        type="number"
                        className={inputClass}
                        min={field.min ?? 0}
                        value={field.max ?? ''}
                        readOnly={readOnly}
                        onChange={(e) =>
                            updateField(
                                'max',
                                e.target.value === ''
                                    ? undefined
                                    : Number(e.target.value)
                            )
                        }
                    />
                </>
            )}

            {fieldDefinition.settings.includes('multiple') && (
                <SwitchInput
                    id={`${field.name || field.type}-multiple`}
                    checked={!!field.multiple}
                    disabled={readOnly}
                    label="Allow multiple selections"
                    help="Let users select more than one option"
                    labelClass={labelClass}
                    helpClass="text-sm text-on-surface-variant"
                    errorClass={errorClass}
                    onCheckedChange={(checked) => updateField('multiple', checked)}
                />
            )}

            {fieldDefinition.settings.includes('options') && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                        <label className={labelClass}>Options</label>

                        {!readOnly && (
                            <Button
                                type="button"
                                onClick={addOption}
                                className={buttonClass}
                            >
                                Add option
                            </Button>
                        )}
                    </div>

                    {(field.options ?? []).map((option, index) => (
                        <div
                            key={`${field.name}-option-${index}`}
                            className="grid grid-cols-[1fr_1fr_auto] gap-2"
                        >
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Label"
                                value={option.label}
                                readOnly={readOnly}
                                onChange={(e) =>
                                    updateOption(
                                        index,
                                        'label',
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Value"
                                value={option.value}
                                readOnly={readOnly}
                                onChange={(e) =>
                                    updateOption(
                                        index,
                                        'value',
                                        e.target.value
                                    )
                                }
                            />

                            {!readOnly && (
                                <Button
                                    type="button"
                                    onClick={() => removeOption(index)}
                                    className={buttonClass}
                                    variant="outline"
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}