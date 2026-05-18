import type { Field, FormTemplate } from '@/types/forms';

export type BuilderField = Field & {
    builderId: string;
};

export function generateBuilderId() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createBuilderField(field: Field): BuilderField {
    return {
        ...field,
        builderId: generateBuilderId(),
    };
}

export function stripBuilderFields(fields: BuilderField[]): Field[] {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return fields.map(({ builderId, ...field }) => field);
}

export function buildTemplatePayload(
    template: Partial<FormTemplate>,
    name: string,
    description: string,
    fields: BuilderField[]
) {
    return {
        ...template,
        name,
        description: description || null,
        schema: {
            fields: stripBuilderFields(fields),
        },
    };
}