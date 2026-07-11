import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    className?: string;
    as?: 'h1' | 'h2';
}

export default function SectionHeader({ eyebrow, title, className, as = 'h2' }: SectionHeaderProps) {
    const Heading = as;

    return (
        <div className={cn('text-center', className)}>
            {eyebrow && <div className="reveal text-xs font-bold tracking-[0.34em] text-wine uppercase">{eyebrow}</div>}
            <Heading className="reveal mt-2.5 font-serif text-[clamp(34px,6vw,64px)] font-semibold text-ink">{title}</Heading>
        </div>
    );
}
