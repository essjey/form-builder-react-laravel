import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
    className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
    const [mounted, setMounted] = React.useState(false);
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        const initialTheme =
            savedTheme === 'dark' || savedTheme === 'light'
                ? savedTheme
                : document.documentElement.classList.contains('dark')
                    ? 'dark'
                    : 'light';

        setTheme(initialTheme);
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (!mounted) {
            return;
        }

        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    if (!mounted) {
        return null;
    }

    function toggleTheme() {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className={cn(
                'relative inline-flex h-10 w-20 items-center rounded-full border border-outline-variant bg-surface-container-high p-1 transition-colors duration-300',
                className
            )}
        >
            <div
                className={cn(
                    'absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300',
                    theme === 'dark' ? 'translate-x-10' : 'translate-x-0'
                )}
            >
                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>

            <div className="flex w-full items-center justify-between px-3">
                <Sun className={cn('h-5 w-5', theme === 'light' ? 'text-primary' : 'text-muted-foreground')} />
                <Moon className={cn('h-5 w-5', theme === 'dark' ? 'text-primary' : 'text-muted-foreground')} />
            </div>
        </button>
    );
}