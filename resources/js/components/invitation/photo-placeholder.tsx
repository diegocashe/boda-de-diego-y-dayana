import { cn } from '@/lib/utils';

interface PhotoPlaceholderProps {
    label: string;
    className?: string;
}

export default function PhotoPlaceholder({ label, className }: PhotoPlaceholderProps) {
    return (
        <div
            className={cn(
                'grid place-items-center overflow-hidden border border-ink/[0.08] bg-[repeating-linear-gradient(135deg,#e9e2d4_0_11px,#f0ebdf_11px_22px)]',
                className,
            )}
        >
            <span className="font-mono text-[10px] tracking-[0.12em] text-ink-faint">{label}</span>
        </div>
    );
}
