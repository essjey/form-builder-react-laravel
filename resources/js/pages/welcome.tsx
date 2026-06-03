import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, GitBranch, Palette, /* Plus, Settings */ } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ToggleTheme';
import { login, register } from '@/routes';

export default function Welcome() {
    return (
        <>
            <Head title="Form Studio" />

            <main className="min-h-screen bg-background text-on-surface">
                <header className="border-b border-outline-variant bg-surface-container-lowest">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-label-md font-semibold">
                            Form Studio
                        </Link>

                        <div className="flex items-center gap-6">
                            <Link href={login()} className="text-label-md text-primary">
                                Login
                            </Link>
                            <ThemeToggle />
                        </div>
                    </nav>
                </header>

                <section className="bg-primary-fixed px-6 py-20 text-center md:py-28">
                    <p className="text-label-sm uppercase tracking-[0.28em] text-primary">
                        Nam at magna.
                    </p>

                    <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-on-primary-fixed md:text-6xl">
                        Praesent varius convallis diam, vel molestie augue sollicitudin id.
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-body-md text-on-primary-fixed-variant md:text-body-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
                    </p>

                    <div className="mx-auto mt-10 flex max-w-sm flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button asChild className="rounded-full px-8 py-6">
                            <Link href={register()}>
                                Register
                            </Link>
                        </Button>

                        <Button asChild variant="secondary" className="rounded-full px-8 py-6">
                            <Link href={login()}>
                                Sign In
                            </Link>
                        </Button>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-label-sm uppercase tracking-[0.28em] text-primary">
                            Vivamus
                        </p>

                        <h2 className="mt-4 text-headline-lg text-on-surface">
                            Donec id dolor eu erat porta varius.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <FeatureCard
                            icon={<GitBranch className="h-5 w-5" />}
                            title="Lorem Ipsum"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula."
                            tone="primary"
                        />

                        <FeatureCard
                            icon={<BadgeCheck className="h-5 w-5" />}
                            title="Lorem Ipsum"
                            description="Curabitur elementum urna sed ex. Quisque sit amet libero purus. In auctor viverra lorem. Praesent varius convallis diam, vel molestie augue sollicitudin id."
                            tone="tertiary"
                        />

                        <FeatureCard
                            icon={<Palette className="h-5 w-5" />}
                            title="Lorem Ipsum"
                            description="Suspendisse interdum neque pretium, cursus ante vel, rhoncus ex. Donec id dolor eu erat porta varius. Nam at magna elementum, vestibulum metus sed, sodales."
                            tone="secondary"
                        />
                    </div>
                </section>

                <footer className="border-t border-outline-variant bg-surface-container px-6 py-12 text-center">
                    <p className="text-headline-md">Form Studio</p>
                    <p className="mt-3 text-sm text-on-surface-variant">
                        © 2026 Lorem Ipsum. All rights reserved.
                    </p>

                    <div className="mt-6 flex justify-center gap-8 text-sm text-on-surface-variant">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </div>
                </footer>

                {/* <nav className="fixed inset-x-0 bottom-0 border-t border-outline-variant bg-surface-container-lowest px-4 py-2 md:hidden">
                    <div className="mx-auto grid max-w-sm grid-cols-4 text-xs">
                        <MobileNavItem active icon={<Plus className="h-4 w-4" />} label="Build" />
                        <MobileNavItem icon={<BadgeCheck className="h-4 w-4" />} label="Fields" />
                        <MobileNavItem icon={<GitBranch className="h-4 w-4" />} label="Logic" />
                        <MobileNavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
                    </div>
                </nav> */}
            </main>
        </>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    tone,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    tone: 'primary' | 'secondary' | 'tertiary';
}) {
    const iconClass = {
        primary: 'bg-primary-fixed text-primary',
        secondary: 'bg-surface-container-highest text-on-surface-variant',
        tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
    }[tone];

    return (
        <article className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconClass}`}>
                {icon}
            </div>

            <h3 className="mt-8 text-label-md font-semibold text-on-surface">
                {title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                {description}
            </p>
        </article>
    );
}

// function MobileNavItem({
//     icon,
//     label,
//     active = false,
// }: {
//     icon: React.ReactNode;
//     label: string;
//     active?: boolean;
// }) {
//     return (
//         <button
//             type="button"
//             className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1 ${active ? 'bg-primary-fixed text-primary' : 'text-on-surface-variant'
//                 }`}
//         >
//             {icon}
//             <span>{label}</span>
//         </button>
//     );
// }