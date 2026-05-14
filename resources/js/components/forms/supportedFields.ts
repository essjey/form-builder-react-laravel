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
        label: 'Short Text',
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

    textarea: {
        type: 'textarea',
        label: 'Long Text',
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
        label: 'Dropdown',
        defaultField: {
            name: '',
            type: 'select',
            label: 'Select',
            help: '',
            required: false,
            multiple: false,
            options: [],
        },
        settings: ['name', 'label', 'help', 'required', /*'multiple',*/ 'options'],
    },

    selectsearch: {
        type: 'selectsearch',
        label: 'Searchable Dropdown',
        defaultField: {
            name: '',
            type: 'selectsearch',
            label: 'Select Search',
            help: '',
            required: false,
            multiple: false,
            options: [],
        },
        settings: ['name', 'label', 'help', 'required', /*'multiple',*/ 'options'],
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

    email: {
        type: 'email',
        label: 'Email',
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

    date: {
        type: 'date',
        label: 'Date',
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