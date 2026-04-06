import type { Field } from '@/types/forms';

export type SupportedFieldType = Field['type'];

export type FieldSettingKey =
    | 'name'
    | 'label'
    | 'help'
    | 'required'
    | 'placeholder'
    | 'min'
    | 'max'
    | 'multiple'
    | 'options';

export type SupportedFieldDefinition = {
    type: SupportedFieldType;
    label: string;
    defaultField: Field;
    settings: FieldSettingKey[];
};

export const supportedFields: Record<SupportedFieldType, SupportedFieldDefinition> = {
    text: {
        type: 'text',
        label: 'Text Input',
        defaultField: {
            name: '',
            type: 'text',
            label: 'Text Field',
            help: '',
            required: false,
            placeholder: '',
        },
        settings: ['name', 'label', 'help', 'required', 'placeholder', 'min', 'max'],
    },

    email: {
        type: 'email',
        label: 'Email Input',
        defaultField: {
            name: '',
            type: 'email',
            label: 'Email',
            help: '',
            required: false,
            placeholder: '',
        },
        settings: ['name', 'label', 'help', 'required', 'placeholder'],
    },

    textarea: {
        type: 'textarea',
        label: 'Textarea',
        defaultField: {
            name: '',
            type: 'textarea',
            label: 'Textarea',
            help: '',
            required: false,
            placeholder: '',
        },
        settings: ['name', 'label', 'help', 'required', 'placeholder', 'min', 'max'],
    },

    select: {
        type: 'select',
        label: 'Select',
        defaultField: {
            name: '',
            type: 'select',
            label: 'Select',
            help: '',
            required: false,
            multiple: false,
            options: [],
        },
        settings: ['name', 'label', 'help', 'required', 'multiple', 'options'],
    },

    checkbox: {
        type: 'checkbox',
        label: 'Checkbox',
        defaultField: {
            name: '',
            type: 'checkbox',
            label: 'Checkbox',
            help: '',
            required: false,
        },
        settings: ['name', 'label', 'help', 'required'],
    },

    date: {
        type: 'date',
        label: 'Date Input',
        defaultField: {
            name: '',
            type: 'date',
            label: 'Date',
            help: '',
            required: false,
        },
        settings: ['name', 'label', 'help', 'required'],
    },
};

export const supportedFieldList = Object.values(supportedFields);

export function createDefaultField(type: SupportedFieldType): Field {
    return { ...supportedFields[type].defaultField };
}