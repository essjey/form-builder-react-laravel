import type { FormTemplate } from '@/types/forms';

type FieldPropertiesPanelProps = {
    template: FormTemplate;
    selectedFieldName: string | null;
};

export default function FieldPropertiesPanel({
    template,
    selectedFieldName,
}: FieldPropertiesPanelProps) {
    const selectedField = template.schema.fields.find(
        (field) => field.name === selectedFieldName
    );

    if (!selectedField) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                Select a field to edit its properties.
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-headline-md">Properties</h2>
            <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-label-md">Selected field</p>
                <p className="text-body-md">{selectedField.label ?? selectedField.name}</p>
                <p className="text-sm text-muted-foreground">{selectedField.type}</p>
            </div>
        </div>
    );
}