import FieldSettings from '@/components/forms/FieldSettings';
import { Button } from '@/components/ui/button';
import type { Field } from '@/types/forms';

type FieldPropertiesPanelProps = {
    selectedField: Field | null;
    existingNames: string[];
    saveDisabled?: boolean;
    saveMessage?: string | null;
    onChange: (updatedField: Field) => void;
    onRemove: () => void;
    onSave: () => void;
};

export default function FieldPropertiesPanel({
    selectedField,
    existingNames,
    onChange,
    onRemove,
    onSave,
    saveMessage,
    saveDisabled = false,
}: FieldPropertiesPanelProps) {
    if (!selectedField) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                Select a field to edit its properties.
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto p-4">
                <FieldSettings
                    field={selectedField}
                    existingNames={existingNames}
                    onChange={onChange}
                    onRemove={onRemove}
                />
            </div>

            <div className="border-t border-border p-4">
                <Button
                    type="button"
                    className="w-full"
                    onClick={onSave}
                    disabled={saveDisabled}
                >
                    {saveMessage ? saveMessage : 'Save'}
                </Button>
            </div>
        </div>
    );
}