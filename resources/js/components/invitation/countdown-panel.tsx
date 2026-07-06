import { useCountdown } from '@/hooks/use-countdown';

const pad = (value: number) => String(value).padStart(2, '0');

export default function CountdownPanel({ targetDate }: { targetDate: string }) {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);
    const units = [
        { label: 'días', value: String(days) },
        { label: 'horas', value: pad(hours) },
        { label: 'min', value: pad(minutes) },
        { label: 'seg', value: pad(seconds) },
    ];

    return (
        <div className="reveal mx-auto grid max-w-[560px] grid-cols-4 gap-[clamp(8px,2vw,20px)] desk:max-w-[760px]">
            {units.map((unit) => (
                <div
                    key={unit.label}
                    className="rounded-[18px] border border-ink/[0.08] bg-white px-1.5 py-[clamp(16px,3vw,30px)] text-center shadow-[0_18px_40px_-26px_rgba(58,52,43,0.6)]"
                >
                    <div className="font-serif text-[clamp(34px,7vw,64px)] leading-none font-semibold text-wine">{unit.value}</div>
                    <div className="mt-2 text-[clamp(9px,1.4vw,11px)] tracking-[0.16em] text-ink-faint uppercase">{unit.label}</div>
                </div>
            ))}
        </div>
    );
}
