import React from 'react';

type BuilderWorkspaceProps = {
    sidebar?: React.ReactNode;
    canvas: React.ReactNode;
    properties?: React.ReactNode;
};

export default function BuilderWorkspace({
    sidebar,
    canvas,
    properties,
}: BuilderWorkspaceProps) {
    return (
        <div className="flex h-full min-h-[calc(100vh-4rem)] overflow-hidden">
            {/* Left Panel */}
            <aside className="hidden w-80 shrink-0 border-r border-border bg-surface-container lg:block">
                <div className="h-full overflow-y-auto">
                    {sidebar}
                </div>
            </aside>

            {/* Canvas */}
            <main className="min-w-0 flex-1 overflow-y-auto bg-background">
                <div className="mx-auto max-w-4xl p-6">
                    {canvas}
                </div>
            </main>

            {/* Right Panel */}
            <aside className="hidden w-96 shrink-0 border-l border-border bg-surface-container xl:block">
                <div className="h-full overflow-y-auto">
                    {properties}
                </div>
            </aside>
        </div>
    );
}