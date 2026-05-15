import { Settings } from 'lucide-react';
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
    onSave?: () => void;
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
            <div className="flex h-full flex-col">
                <PanelHeader />

                <div className="flex-1 p-8 text-sm text-muted-foreground">
                    Select a field to edit its properties.
                </div>

                <PanelFooter
                    onSave={onSave}
                    saveDisabled={true}
                    saveMessage={saveMessage}
                />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col bg-background">
            <PanelHeader />

            <div className="flex-1 overflow-y-auto px-8 py-6">
                <FieldSettings
                    field={selectedField}
                    existingNames={existingNames}
                    onChange={onChange}
                    onRemove={onRemove}
                    wrapperClass="space-y-6 border-0 p-0"
                    labelClass="block text-label-sm uppercase text-on-surface-variant"
                    inputClass="w-full rounded-lg border-0 bg-surface-container-low px-4 py-3 text-body-md text-on-surface focus:ring-2 focus:ring-primary"
                    errorClass="mt-1 text-sm text-error"
                    buttonClass="rounded-lg border border-outline-variant px-3 py-2 text-sm"
                />
            </div>

            <PanelFooter
                onSave={onSave}
                saveDisabled={saveDisabled}
                saveMessage={saveMessage}
            />
        </div>
    );
}

function PanelHeader() {
    return (
        <div className="flex items-center justify-between border-b border-outline-variant px-8 py-6">
            <h2 className="text-label-md uppercase tracking-wide text-on-surface">
                Field Properties
            </h2>

            <Settings className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
    );
}

function PanelFooter({
    onSave,
    saveDisabled,
    saveMessage,
}: {
    onSave?: () => void;
    saveDisabled: boolean;
    saveMessage?: string | null;
}) {
    return (
        <div className="border-t border-outline-variant bg-surface-container-lowest px-8 py-6">
            <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl border-primary py-6 text-body-md font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={onSave}
                disabled={saveDisabled}
            >
                {saveMessage ?? 'Save Field Settings'}
            </Button>
        </div>
    );
}