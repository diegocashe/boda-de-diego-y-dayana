import PhotoPlaceholder from '@/components/invitation/photo-placeholder';
import SectionHeader from '@/components/invitation/section-header';
import { TimelineIcon } from '@/lib/timeline-icons';
import { cn } from '@/lib/utils';
import type { TimelineMilestone } from '@/types/invitation';

export default function StorySection({ milestones }: { milestones: TimelineMilestone[] }) {
    return (
        <>
            <SectionHeader eyebrow="Nuestra historia" title="El camino a este día" className="mb-[clamp(30px,5vw,54px)]" />

            <div className="relative flex flex-col gap-[26px] desk:block desk:pt-3 desk:pb-2">
                <div className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-blush-line to-[#c7d0bc] desk:block" />
                <div className="absolute top-1 bottom-1 left-[5px] w-0.5 bg-gradient-to-b from-blush-line to-[#c7d0bc] desk:hidden" />
                {milestones.map((milestone, index) => (
                    <TimelineItem key={milestone.id} milestone={milestone} side={index % 2 === 0 ? 'left' : 'right'} />
                ))}
            </div>
        </>
    );
}

function TimelineItem({ milestone, side }: { milestone: TimelineMilestone; side: 'left' | 'right' }) {
    return (
        <div
            className={cn(
                'reveal relative pl-[30px] desk:mb-[64px] desk:w-[calc(50%-48px)] desk:pl-0',
                side === 'right' && 'desk:ml-[calc(50%+48px)]',
            )}
        >
            <span
                className={cn(
                    'absolute top-[14px] hidden size-[15px] rounded-full border-[3px] border-parchment bg-wine shadow-[0_0_0_3px_rgba(122,31,43,0.18)] desk:block',
                    side === 'right' ? '-left-14' : '-right-14',
                )}
            />
            <span className="absolute top-[6px] left-0 block size-[11px] rounded-full border-[3px] border-parchment bg-wine shadow-[0_0_0_3px_rgba(122,31,43,0.18)] desk:hidden" />

            {milestone.imageUrl ? (
                <img
                    src={milestone.imageUrl}
                    alt={milestone.title}
                    className="block h-auto max-h-[50vh] w-auto max-w-[50vw] border border-ink/[0.08]"
                />
            ) : (
                <PhotoPlaceholder label="Foto de este momento" className="aspect-[4/3] max-h-[50vh] w-full max-w-[50vw]" />
            )}

            <div
                className={cn(
                    'relative z-10 -mt-10 w-[82%] max-w-[380px] rounded-[18px] border p-4 pb-[16px] shadow-[0_22px_44px_-30px_rgba(58,52,43,0.7)] desk:-mt-12',
                    side === 'left' ? 'mr-[-10px] ml-auto desk:mr-[-24px]' : 'mr-auto ml-[-10px] desk:ml-[-24px]',
                    milestone.highlighted ? 'border-[#e3cbcf] bg-gradient-to-b from-white to-[#f6eeef]' : 'border-ink/[0.08] bg-white',
                )}
            >
                <div className="inline-flex items-center gap-2 text-wine">
                    <TimelineIcon name={milestone.icon} className="size-4" strokeWidth={1.7} />
                    <span className="text-[11px] font-bold tracking-[0.16em] uppercase">{milestone.period}</span>
                </div>
                <h3 className="mt-[5px] mb-[7px] font-serif text-[clamp(21px,3.2vw,27px)] font-semibold text-ink">{milestone.title}</h3>
                <p className="text-sm leading-[1.6] text-ink-soft">{milestone.description}</p>
            </div>
        </div>
    );
}
