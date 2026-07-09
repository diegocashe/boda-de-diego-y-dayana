import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    eyebrow: string | undefined;
    title: string;
    className?: string;
}

export default function SectionHeader({ eyebrow, title, className }: SectionHeaderProps) {
    return (
        <div className={cn('text-center', className)}>
            {eyebrow && <div className="reveal text-xs font-bold tracking-[0.34em] text-wine uppercase">{eyebrow}</div>}
            <h2 className="reveal mt-2.5 font-serif text-[clamp(34px,6vw,64px)] font-semibold text-ink">{title}</h2>
        </div>
    );
}
