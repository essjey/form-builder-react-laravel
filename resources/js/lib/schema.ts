import { z } from 'zod';
import type { Field } from '@/types/forms';

function getFieldLabel(field: Field) {
    return field.label?.trim() || 'This field';
}

function emptyStringToUndefined(value: unknown) {
    return value === '' ? undefined : value;
}

export function buildFieldSchema(field: Field) {
    const fieldLabel = getFieldLabel(field);

    switch (field.type) {
        case 'email': {
            let stringSchema = z
                .string({
                    error: `${fieldLabel} must be a valid email address.`,
                })
                .email({
                    error: `${fieldLabel} must be a valid email address.`,
                });

            if (field.required) {
                stringSchema = stringSchema.min(1, {
                    error: `${fieldLabel} is required.`,
                });

                return stringSchema;
            }

            return z.preprocess(
                emptyStringToUndefined,
                stringSchema.optional()
            );
        }

        case 'text':
        case 'textarea': {
            let stringSchema = z.string({
                error: `${fieldLabel} must be valid text.`,
            });

            if (field.required) {
                stringSchema = stringSchema.min(1, {
                    error: `${fieldLabel} is required.`,
                });
            }

            if (field.min !== undefined) {
                stringSchema = stringSchema.min(field.min, {
                    error: `${fieldLabel} must be at least ${field.min} characters.`,
                });
            }

            if (field.max !== undefined) {
                stringSchema = stringSchema.max(field.max, {
                    error: `${fieldLabel} must be no more than ${field.max} characters.`,
                });
            }

            if (field.required) {
                return stringSchema;
            }

            return z.preprocess(
                emptyStringToUndefined,
                stringSchema.optional()
            );
        }

        case 'checkbox': {
            let schema = z.boolean({
                error: `${fieldLabel} must be a valid checkbox value.`,
            });

            if (field.required) {
                schema = schema.refine((val) => val === true, {
                    message: `${fieldLabel} is required.`,
                });
            }

            return schema;
        }

        case 'select': {
            if (field.multiple) {
                let arraySchema = z.array(z.string(), {
                    error: `${fieldLabel} must be a valid selection.`,
                });

                if (field.required) {
                    arraySchema = arraySchema.min(1, {
                        error: `Please select at least one option for ${fieldLabel.toLowerCase()}.`,
                    });

                    return arraySchema;
                }

                return arraySchema.optional();
            }

            let stringSchema = z.string({
                error: `${fieldLabel} must be a valid selection.`,
            });

            if (field.required) {
                stringSchema = stringSchema.min(1, {
                    error: `Please select a value for ${fieldLabel.toLowerCase()}.`,
                });

                return stringSchema;
            }

            return z.preprocess(
                emptyStringToUndefined,
                stringSchema.optional()
            );
        }

        case 'date': {
            let stringSchema = z.string({
                error: `${fieldLabel} must be a valid date.`,
            });

            if (field.required) {
                stringSchema = stringSchema.min(1, {
                    error: `Please select a date for ${fieldLabel.toLowerCase()}.`,
                });

                return stringSchema;
            }

            return z.preprocess(
                emptyStringToUndefined,
                stringSchema.optional()
            );
        }

        default:
            return z.any();
    }
}

export function buildFormSchema(fields: Field[]) {
    const shape: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field) => {
        if (!field.name) {
            return;
        }

        shape[field.name] = buildFieldSchema(field);
    });

    return z.object(shape);
}