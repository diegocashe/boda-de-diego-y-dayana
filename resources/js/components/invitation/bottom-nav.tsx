import { NAV_ITEMS  } from '@/components/invitation/nav-items';
import type {NavProps} from '@/components/invitation/nav-items';
import { cn } from '@/lib/utils';

export default function BottomNav({ activeTab, onNavigate }: NavProps) {
    return (
        <nav className="fixed right-0 bottom-0 left-0 z-50 grid grid-cols-4 items-center border-t border-ink/10 bg-[#f8f4eb]/90 px-1.5 pt-[9px] pb-[calc(9px+env(safe-area-inset-bottom))] backdrop-blur-xl desk:hidden">
            {NAV_ITEMS.map(({ tab, label, icon: Icon }) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => onNavigate(tab)}
                    className={cn(
                        'flex cursor-pointer flex-col items-center gap-1 py-1 transition-colors duration-250',
                        activeTab === tab ? 'text-wine-deep' : 'text-[#aaa091]',
                    )}
                >
                    <Icon className="size-[22px]" strokeWidth={1.7} />
                    <span className="text-[10px] font-semibold">{label}</span>
                </button>
            ))}
        </nav>
    );
}
