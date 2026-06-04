import { Layers, Settings, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BuilderMobileMode = 'build' | 'structure' | 'properties';

type BuilderMobileTabsProps = {
    mode: BuilderMobileMode;
    onChange: (mode: BuilderMobileMode) => void;
};

const tabs = [
    { value: 'build', label: 'Build', icon: Wrench },
    { value: 'structure', label: 'Structure', icon: Layers },
    { value: 'properties', label: 'Properties', icon: Settings },
] as const;

export default function BuilderMobileTabs({
    mode,
    onChange,
}: BuilderMobileTabsProps) {
    return (
        <nav className="grid grid-cols-3 border-b border-outline-variant bg-surface-container-lowest lg:hidden">
            {tabs.map(({ value, label, icon: Icon }) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => onChange(value)}
                    className={cn(
                        'flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium',
                        mode === value
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-on-surface-variant'
                    )}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </button>
            ))}
        </nav>
    );
}