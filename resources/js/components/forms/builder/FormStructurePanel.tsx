import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Columns3, Rows3, SplitSquareHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Field } from '@/types/forms';

type StructureField = Field & {
    builderId: string;
};

type FormStructurePanelProps = {
    fields: StructureField[];
    selectedFieldName?: string | null;
    onSelectField?: (fieldName: string) => void;
    onReorderFields: (fields: StructureField[]) => void;
};

export default function FormStructurePanel({
    fields,
    selectedFieldName,
    onSelectField,
    onReorderFields,
}: FormStructurePanelProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = fields.findIndex((field) => field.builderId === active.id);
        const newIndex = fields.findIndex((field) => field.builderId === over.id);

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        onReorderFields(arrayMove(fields, oldIndex, newIndex));
    }

    return (
        <div className="flex h-full flex-col bg-surface-container">
            <div className="border-b border-outline-variant px-6 py-5">
                <h2 className="text-label-md uppercase tracking-wide text-on-surface">
                    Structure
                </h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                    Organize fields and layout.
                </p>
            </div>

            <div className="space-y-6 overflow-y-auto p-4">
                <section className="space-y-3 overflow-hidden">
                    <h3 className="text-label-sm uppercase text-on-surface-variant">
                        Fields
                    </h3>

                    {fields.length > 0 ? (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={fields.map((field) => field.builderId)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-2">
                                    {fields.map((field) => (
                                        <SortableFieldRow
                                            key={field.builderId}
                                            field={field}
                                            selected={field.name === selectedFieldName}
                                            onSelect={() => onSelectField?.(field.name)}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    ) : (
                        <div className="rounded-lg border border-dashed border-outline-variant p-4 text-sm text-on-surface-variant">
                            No fields added yet.
                        </div>
                    )}
                </section>

                <section className="space-y-3">
                    <h3 className="text-label-sm uppercase text-on-surface-variant">
                        Layout
                    </h3>

                    <div className="grid grid-cols-1 gap-2">
                        <Button type="button" variant="outline" className="justify-start" disabled>
                            <Rows3 className="mr-2 h-4 w-4" />
                            Add divider
                        </Button>

                        <Button type="button" variant="outline" className="justify-start" disabled>
                            <Columns3 className="mr-2 h-4 w-4" />
                            Add columns
                        </Button>

                        <Button type="button" variant="outline" className="justify-start" disabled>
                            <SplitSquareHorizontal className="mr-2 h-4 w-4" />
                            Add section
                        </Button>
                    </div>

                    <p className="text-xs text-on-surface-variant">
                        Layout tools are placeholders for future structure controls.
                    </p>
                </section>
            </div>
        </div>
    );
}

type SortableFieldRowProps = {
    field: StructureField;
    selected: boolean;
    onSelect: () => void;
};

function SortableFieldRow({
    field,
    selected,
    onSelect,
}: SortableFieldRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: field.builderId,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors',
                selected
                    ? 'border-primary bg-surface-container-high text-on-surface'
                    : 'border-outline-variant bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high',
                isDragging && 'z-10 opacity-70 shadow-lg'
            )}
        >
            <button
                type="button"
                className="cursor-grab rounded p-1 text-on-surface-variant active:cursor-grabbing"
                aria-label={`Reorder ${field.label || field.name || 'field'}`}
                {...attributes}
                {...listeners}
            >
                <GripVertical className="h-4 w-4 shrink-0 opacity-60" />
            </button>

            <button
                type="button"
                onClick={onSelect}
                className="min-w-0 flex-1 text-left"
            >
                <p className="truncate text-sm font-medium">
                    {field.label || field.name || 'Untitled field'}
                </p>
                <p className="text-xs text-on-surface-variant">
                    {field.type}
                </p>
            </button>
        </div>
    );
}