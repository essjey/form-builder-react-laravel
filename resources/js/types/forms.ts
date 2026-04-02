export type SelectOption = {
    value: string;
    label: string;
};

export type Field = {
    name: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'date';
    label?: string;
    help?: string;
    required?: boolean;
    options?: SelectOption[];
    placeholder?: string;
    min?: number;
    max?: number;
    multiple?: boolean;
};

export type FormTemplate = {
    id: number;
    name: string;
    description?: string | null;
    schema: {
        fields: Field[];
    };
    created_at: string;
};

export type FormValue = string | boolean | string[];