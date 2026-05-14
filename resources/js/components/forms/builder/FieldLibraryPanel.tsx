import { supportedFieldList } from '@/components/forms/supportedFields';
import type { SupportedFieldType } from '@/components/forms/supportedFields';
import { Button } from '@/components/ui/button';

type FieldLibraryPanelProps = {
    onAddField: (type: SupportedFieldType) => void;
};

export default function FieldLibraryPanel({
    onAddField,
}: FieldLibraryPanelProps) {
    return (
        <div className="space-y-6 p-4">
            <div>
                <h2 className="text-headline-md">Fields</h2>

                <p className="mt-1 text-body-md text-muted-foreground">
                    Add fields to your form.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {supportedFieldList.map((fieldDefinition) => (
                    <Button
                        key={fieldDefinition.type}
                        type="button"
                        variant="outline"
                        className="justify-start"
                        onClick={() => onAddField(fieldDefinition.type)}
                    >
                        {fieldDefinition.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}