import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, GitBranch, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ToggleTheme';
import { login, register } from '@/routes';

const siteName: string = 'Form Studio';
const footerLinks: { label: string; href: string }[] = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
];

export default function Welcome() {
    return (
        <>
            <Head title={siteName} />

            <main className="min-h-screen bg-background text-on-surface">
                <header className="border-b border-outline-variant bg-surface-container-lowest">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-label-md font-semibold">
                            {siteName}
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
                    <p className="text-headline-md">{siteName}</p>
                    <p className="mt-3 text-sm text-on-surface-variant">
                        © 2026 Lorem Ipsum. All rights reserved.
                    </p>

                    <div className="mt-6 flex justify-center gap-8 text-sm text-on-surface-variant">
                        {footerLinks.map((link) => (
                            <a key={link.href} href={link.href}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </footer>
            </main>
        </>
    );
}

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    tone: 'primary' | 'secondary' | 'tertiary';
};

function FeatureCard({
    icon,
    title,
    description,
    tone,
}: FeatureCardProps) {

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