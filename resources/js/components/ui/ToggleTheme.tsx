import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
    className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
    const { appearance, updateAppearance } = useAppearance();

    const isDark = appearance === 'dark';

    return (
        <button
            type="button"
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={cn(
                'relative inline-flex h-10 w-20 items-center rounded-full border border-outline-variant bg-surface-container-high p-1 transition-colors',
                className,
            )}
        >
            <span
                className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform',
                    isDark ? 'translate-x-10' : 'translate-x-0',
                )}
            >
                {isDark ? (
                    <Moon className="h-4 w-4" />
                ) : (
                    <Sun className="h-4 w-4" />
                )}
            </span>
        </button>
    );
}