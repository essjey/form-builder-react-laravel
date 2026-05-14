import { CaseLower, Text, SquareChevronDown, ScanSearch, SquareCheck, Mail, CalendarFold } from 'lucide-react';
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
    icon?: React.ComponentType;
    label: string;
    defaultField: Field;
    settings: FieldSettingKey[];
};

export const supportedFields: Record<SupportedFieldType, SupportedFieldDefinition> = {
    text: {
        type: 'text',
        label: 'Short Text',
        icon: CaseLower,
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
        icon: Text,
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
        icon: SquareChevronDown,
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
        icon: ScanSearch,
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
        icon: SquareCheck,
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
        icon: Mail,
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
        icon: CalendarFold,
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