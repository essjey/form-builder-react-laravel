import React from 'react';
import { cn } from '@/lib/utils';

type SelectOption = {
    value: string;
    label: string;
};

type SearchableSelectInputProps = {
    id: string;
    name: string;
    value: string;
    options: SelectOption[];
    onChange?: (value: string) => void;
    disabled?: boolean;
    tabIndex?: number;
    preview?: boolean;
    label?: string;
    error?: string;
    help?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    labelClass?: string;
    triggerClass?: string;
    panelClass?: string;
    searchInputClass?: string;
    optionClass?: string;
    activeOptionClass?: string;
    selectedOptionClass?: string;
    helpClass?: string;
    errorClass?: string;
};

export default function SearchableSelectInput({
    id,
    name,
    value,
    options,
    onChange,
    disabled = false,
    tabIndex,
    preview = false,
    label,
    error,
    help,
    placeholder = 'Select an option',
    searchPlaceholder = 'Search options...',
    labelClass,
    triggerClass = 'w-full rounded border px-3 py-2 text-left',
    panelClass = 'absolute z-20 mt-1 w-full rounded border bg-white dark:bg-gray-800 shadow',
    searchInputClass = 'w-full border-b px-3 py-2',
    optionClass = 'w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700',
    activeOptionClass = 'bg-gray-100 dark:bg-gray-700',
    selectedOptionClass = 'font-semibold',
    helpClass,
    errorClass,
}: SearchableSelectInputProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [activeIndex, setActiveIndex] = React.useState(0);

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const listboxId = `${id}-listbox`;
    const searchId = `${id}-search`;

    const selectedOption = options.find((option) => option.value === value);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
    );

    const activeOption = filteredOptions[activeIndex];

    function open() {
        if (disabled || preview) {
            return;
        }

        setIsOpen(true);
        setActiveIndex(0);
    }

    function close() {
        setIsOpen(false);
        setQuery('');
        setActiveIndex(0);
    }

    function selectOption(option: SelectOption) {
        onChange?.(option.value);
        close();
    }

    function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
        if (disabled || preview) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            open();
        }
    }

    function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((current) => Math.min(current + 1, filteredOptions.length - 1));
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((current) => Math.max(current - 1, 0));
        }

        if (event.key === 'Enter' && activeOption) {
            event.preventDefault();
            selectOption(activeOption);
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            close();
        }
    }

    React.useEffect(() => {
        if (isOpen) {
            window.setTimeout(() => searchInputRef.current?.focus(), 0);
        }
    }, [isOpen]);

    React.useEffect(() => {
        function handleDocumentClick(event: MouseEvent) {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                close();
            }
        }

        document.addEventListener('mousedown', handleDocumentClick);

        return () => document.removeEventListener('mousedown', handleDocumentClick);
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={cn('relative', preview && 'pointer-events-none')}
        >
            {label && (
                <label id={`${id}-label`} className={cn(`${labelClass} block mb-2`)}>
                    {label}
                </label>
            )}

            {!preview && <input type="hidden" name={name} value={value} />}

            <button
                id={id}
                type="button"
                role="combobox"
                tabIndex={preview ? -1 : tabIndex}
                disabled={disabled}
                aria-labelledby={label ? `${id}-label` : undefined}
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-haspopup="listbox"
                aria-invalid={!!error}
                aria-describedby={[
                    help ? `help-${id}` : null,
                    error ? `error-${id}` : null,
                ].filter(Boolean).join(' ') || undefined}
                className={triggerClass}
                onClick={() => (isOpen ? close() : open())}
                onKeyDown={handleTriggerKeyDown}
            >
                {selectedOption?.label ?? placeholder}
            </button>

            {!preview && isOpen && (
                <div className={panelClass}>
                    <input
                        ref={searchInputRef}
                        id={searchId}
                        type="search"
                        value={query}
                        placeholder={searchPlaceholder}
                        className={searchInputClass}
                        autoComplete="off"
                        aria-label={`Search ${label ?? name} options`}
                        aria-controls={listboxId}
                        aria-activedescendant={
                            activeOption ? `${id}-option-${activeOption.value}` : undefined
                        }
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActiveIndex(0);
                        }}
                        onKeyDown={handleSearchKeyDown}
                    />

                    <ul id={listboxId} role="listbox" className="max-h-60 overflow-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => {
                                const isActive = index === activeIndex;
                                const isSelected = option.value === value;

                                return (
                                    <li
                                        key={option.value}
                                        id={`${id}-option-${option.value}`}
                                        role="option"
                                        aria-selected={isSelected}
                                    >
                                        <button
                                            type="button"
                                            className={cn(
                                                optionClass,
                                                isActive && activeOptionClass,
                                                isSelected && selectedOptionClass,
                                            )}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            onClick={() => selectOption(option)}
                                        >
                                            {option.label}
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="px-3 py-2 text-sm text-gray-500">
                                No options found.
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {help && (
                <div id={`help-${id}`} className={helpClass}>
                    {help}
                </div>
            )}

            {error && (
                <div role="alert" id={`error-${id}`} className={errorClass}>
                    {error}
                </div>
            )}
        </div>
    );
}