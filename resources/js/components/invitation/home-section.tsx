import { ChevronDown, Heart } from 'lucide-react';
import CountdownPanel from '@/components/invitation/countdown-panel';
import { buildWeddingLabels } from '@/lib/wedding';
import type { WeddingLabels } from '@/lib/wedding';
import { cn } from '@/lib/utils';
import type { HomeContent, WeddingDetails } from '@/types/invitation';
import imageUrl from '../../../assets/upscalemedia-transformed.webp';
interface HomeSectionProps {
    wedding: WeddingDetails;
    content: HomeContent;
}

interface WeddingSectionProps {
    wedding: WeddingDetails;
    labels: WeddingLabels;
    content: HomeContent;
}

const snapClass = 'relative flex min-h-dvh snap-start snap-always flex-col justify-center';

export default function HomeSection({ wedding, content }: HomeSectionProps) {
    const labels = buildWeddingLabels(wedding);

    return (
        <div className="scrollbar-hidden h-dvh snap-y snap-mandatory overflow-x-hidden overflow-y-auto">
            <HeroSection wedding={wedding} labels={labels} content={content} />
            <CountdownSection wedding={wedding} labels={labels} content={content} />
            <CtaSection content={content} />
        </div>
    );
}

function HeroSection({ wedding, labels, content }: WeddingSectionProps) {
    return (
        <section className={cn(snapClass, 'overflow-hidden')}>
            <div className="absolute inset-0 overflow-hidden">
                <div className="hero-parallax absolute inset-x-0 -inset-y-[12%] bg-center bg-no-repeat">
                    <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,14,12,0.72)_0%,rgba(24,14,12,0.7)_38%,rgba(24,14,12,0.66)_66%,rgba(24,14,12,0.92)_100%)]" />
            </div>

            <div className="relative z-[2] px-6 text-center text-cream">
                <div className="hero-fade text-xs font-semibold tracking-[0.42em] text-cream/82 uppercase">{content.heroEyebrow}</div>
                <div className="hero-fade hero-fade-d1 mt-[clamp(14px,3vw,26px)]">
                    <div className="font-serif text-[clamp(58px,15vw,132px)] leading-[0.9] font-semibold">{wedding.groomName}</div>
                    <div className="my-0.5 font-serif text-[clamp(28px,7vw,58px)] text-gold italic">&amp;</div>
                    <div className="font-serif text-[clamp(58px,15vw,132px)] leading-[0.9] font-semibold">{wedding.brideName}</div>
                </div>
                <div className="hero-fade hero-fade-d2 mt-[clamp(20px,4vw,34px)] flex items-center justify-center gap-3.5">
                    <span className="h-px w-[clamp(40px,7vw,80px)] bg-gradient-to-r from-transparent to-cream/70" />
                    <span className="size-[7px] rotate-45 bg-gold" />
                    <span className="h-px w-[clamp(40px,7vw,80px)] bg-gradient-to-r from-cream/70 to-transparent" />
                </div>
                <div className="hero-fade hero-fade-d3 mt-3.5 font-serif text-[clamp(22px,4vw,32px)] font-medium">{labels.dateLabel}</div>
                <div className="hero-fade hero-fade-d3 mt-2 text-[clamp(12px,2.4vw,15px)] tracking-[0.14em] text-cream/78 uppercase">
                    {labels.placeLabel}
                </div>
            </div>

            <div className="absolute right-0 bottom-[clamp(96px,12vh,120px)] left-0 z-[2] flex flex-col items-center gap-[7px] text-cream/85">
                <span className="text-[10px] tracking-[0.28em] uppercase">{content.heroScrollHint}</span>
                <ChevronDown className="scroll-cue size-5" strokeWidth={1.6} />
            </div>
        </section>
    );
}

function CountdownSection({ wedding, labels, content }: WeddingSectionProps) {
    return (
        <section className={cn(snapClass, 'bg-[radial-gradient(120%_90%_at_50%_0%,#fbf8f0_0%,#f4efe4_60%)] pt-[88px] pb-[118px]')}>
            <div className="mx-auto w-full max-w-[1120px] px-[22px] text-center">
                <div className="reveal text-xs font-bold tracking-[0.36em] text-wine uppercase">{content.countdownEyebrow}</div>
                <h2 className="reveal mt-2.5 mb-[30px] font-serif text-[clamp(32px,6vw,58px)] font-semibold text-ink">{content.countdownHeading}</h2>
                <CountdownPanel targetDate={wedding.weddingAt} />
                <div className="reveal mt-[30px] font-serif text-[clamp(17px,2.6vw,22px)] text-ink-soft italic">{labels.countdownCaption}</div>
            </div>
        </section>
    );
}

function CtaSection({ content }: { content: HomeContent }) {
    return (
        <section className={cn(snapClass, 'bg-gradient-to-b from-parchment-light to-[#eae1cf] pt-24 pb-[118px]')}>
            <div className="mx-auto w-full max-w-[720px] px-[22px] text-center">
                <div className="reveal inline-flex items-center gap-2.5 text-wine">
                    <span className="h-px w-[30px] bg-wine/40" />
                    <Heart className="size-[18px]" strokeWidth={1.5} />
                    <span className="h-px w-[30px] bg-wine/40" />
                </div>
                <h2 className="reveal mt-5 font-serif text-[clamp(30px,5.5vw,52px)] leading-[1.08] font-semibold text-ink">{content.ctaHeading}</h2>
                <p className="reveal mx-auto mt-[22px] max-w-[520px] text-[clamp(14px,2.2vw,16.5px)] leading-[1.75] text-ink-soft">
                    {content.ctaParagraph}
                </p>
            </div>
        </section>
    );
}
