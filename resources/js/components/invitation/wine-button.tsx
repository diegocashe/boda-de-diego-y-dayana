import { cn } from '@/lib/utils';

export default function WineButton({ className, children, ...props }: React.ComponentProps<'button'>) {
    return (
        <button
            type="button"
            className={cn(
                'flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-[14px] bg-wine-deep p-[15px] text-[15px] font-bold text-cream shadow-[0_16px_30px_-14px_var(--color-wine-deep)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[#cfc7b6] disabled:shadow-none',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
