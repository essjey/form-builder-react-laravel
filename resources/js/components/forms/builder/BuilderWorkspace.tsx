import React from 'react';
import BuilderMobileTabs from './BuilderMobileTabs';
import type { BuilderMobileMode } from './BuilderMobileTabs';

type BuilderWorkspaceProps = {
    sidebar?: React.ReactNode;
    canvas: React.ReactNode;
    properties?: React.ReactNode;
    mobileMode?: BuilderMobileMode;
    onMobileModeChange?: (mode: BuilderMobileMode) => void;
};

export default function BuilderWorkspace({
    sidebar,
    canvas,
    properties,
    mobileMode = 'build',
    onMobileModeChange,
}: BuilderWorkspaceProps) {
    const mobileContent = {
        build: canvas,
        structure: sidebar,
        properties,
    }[mobileMode];

    return (
        <main className="flex h-full min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-background">
            {onMobileModeChange && (
                <BuilderMobileTabs
                    mode={mobileMode}
                    onChange={onMobileModeChange}
                />
            )}

            <div className="min-h-0 flex-1 overflow-hidden">
                <div className="grid h-full grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)_15rem] xl:grid-cols-[20rem_minmax(0,1fr)_24rem]">
                    <section className="hidden min-h-0 border-r border-border bg-surface-container lg:block">
                        <div className="h-full overflow-y-auto">
                            {sidebar}
                        </div>
                    </section>

                    <section className="hidden min-h-0 bg-background lg:block">
                        <div className="h-full overflow-y-auto">
                            <div className="mx-auto max-w-4xl p-6">
                                {canvas}
                            </div>
                        </div>
                    </section>

                    <section className="hidden min-h-0 border-l border-border bg-surface-container lg:block">
                        <div className="h-full overflow-y-auto">
                            {properties}
                        </div>
                    </section>

                    <section className="min-h-0 bg-background lg:hidden">
                        <div className="h-full overflow-y-auto p-4">
                            {mobileContent}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}