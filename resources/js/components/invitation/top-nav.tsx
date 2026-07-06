import { NAV_ITEMS  } from '@/components/invitation/nav-items';
import type {NavProps} from '@/components/invitation/nav-items';
import { cn } from '@/lib/utils';

export default function TopNav({ activeTab, onNavigate }: NavProps) {
    return (
        <nav className="fixed top-5 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-[26px] rounded-full border border-ink/10 bg-[#f8f4eb]/80 py-[11px] pr-3 pl-6 shadow-[0_18px_44px_-22px_rgba(58,52,43,0.5)] backdrop-blur-2xl desk:flex">
            <div className="pr-2 font-serif text-[22px] font-bold tracking-[0.02em] text-wine">
                D <span className="text-gold-deep italic">&amp;</span> D
            </div>
            {NAV_ITEMS.map(({ tab, label }) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => onNavigate(tab)}
                    className={cn(
                        'cursor-pointer rounded-full px-4 py-[9px] text-sm font-semibold tracking-[0.01em] transition-all duration-200',
                        activeTab === tab ? 'bg-wine-deep text-cream' : 'text-ink-soft',
                    )}
                >
                    {label}
                </button>
            ))}
        </nav>
    );
}
