import { ArrowRight, ChevronDown, Heart } from 'lucide-react';
import CountdownPanel from '@/components/invitation/countdown-panel';
import PhotoPlaceholder from '@/components/invitation/photo-placeholder';
import WineButton from '@/components/invitation/wine-button';
import { buildWeddingLabels } from '@/lib/wedding';
import type { WeddingLabels } from '@/lib/wedding';
import { cn } from '@/lib/utils';
import type { WeddingDetails } from '@/types/invitation';

interface HomeSectionProps {
    wedding: WeddingDetails;
    onConfirm: () => void;
}

interface WeddingSectionProps {
    wedding: WeddingDetails;
    labels: WeddingLabels;
}

const snapClass = 'relative flex min-h-dvh snap-start snap-always flex-col justify-center';

export default function HomeSection({ wedding, onConfirm }: HomeSectionProps) {
    const labels = buildWeddingLabels(wedding);

    return (
        <div className="scrollbar-hidden h-dvh snap-y snap-mandatory overflow-x-hidden overflow-y-auto">
            <HeroSection wedding={wedding} labels={labels} />
            <ArchSection wedding={wedding} labels={labels} />
            <CountdownSection wedding={wedding} labels={labels} />
            <CtaSection onConfirm={onConfirm} />
        </div>
    );
}

function HeroSection({ wedding, labels }: WeddingSectionProps) {
    return (
        <section className={cn(snapClass, 'overflow-hidden')}>
            <div className="absolute inset-0 overflow-hidden">
                <div className="hero-parallax absolute inset-x-0 -inset-y-[12%]">
                    <PhotoPlaceholder label="Foto de los novios" className="h-full w-full rounded-none border-none" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,23,21,0.5)_0%,rgba(36,23,21,0.12)_38%,rgba(36,23,21,0.35)_66%,rgba(36,23,21,0.82)_100%)]" />
            </div>

            <div className="relative z-[2] px-6 text-center text-cream">
                <div className="hero-fade text-xs font-semibold tracking-[0.42em] text-cream/82 uppercase">Nos casamos</div>
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
                <span className="text-[10px] tracking-[0.28em] uppercase">Desliza</span>
                <ChevronDown className="scroll-cue size-5" strokeWidth={1.6} />
            </div>
        </section>
    );
}

// Sección conservada del diseño anterior: retrato en arco con los nombres y la fecha.
function ArchSection({ wedding, labels }: WeddingSectionProps) {
    return (
        <section className={cn(snapClass, 'bg-gradient-to-b from-white to-parchment py-20')}>
            <div className="mx-auto w-full max-w-[1120px] px-[22px] text-center">
                <div className="reveal text-xs font-semibold tracking-[0.34em] text-wine uppercase">Nuestro gran día</div>

                <PhotoPlaceholder
                    label="FOTO · pareja"
                    className="reveal mx-auto mt-[22px] h-[clamp(238px,32vw,320px)] w-[clamp(190px,26vw,256px)] rounded-[160px_160px_16px_16px]"
                />

                <div className="reveal">
                    <h1 className="mt-[26px] font-serif text-[clamp(52px,7vw,76px)] leading-[0.94] font-semibold text-ink">{wedding.groomName}</h1>
                    <div className="my-0.5 font-serif text-[clamp(30px,4vw,42px)] text-wine italic">&amp;</div>
                    <h1 className="font-serif text-[clamp(52px,7vw,76px)] leading-[0.94] font-semibold text-ink">{wedding.brideName}</h1>
                </div>

                <div className="reveal mt-6 mb-1 flex items-center justify-center gap-3">
                    <span className="h-px w-11 bg-gradient-to-r from-transparent to-gold" />
                    <span className="size-[7px] rotate-45 bg-wine" />
                    <span className="h-px w-11 bg-gradient-to-r from-gold to-transparent" />
                </div>

                <div className="reveal">
                    <div className="font-serif text-[clamp(22px,3vw,28px)] font-medium text-ink">{labels.dateLabel}</div>
                    <div className="mt-[5px] text-[13px] tracking-[0.02em] text-ink-muted">{labels.placeLabel}</div>
                </div>
            </div>
        </section>
    );
}

function CountdownSection({ wedding, labels }: WeddingSectionProps) {
    return (
        <section className={cn(snapClass, 'bg-[radial-gradient(120%_90%_at_50%_0%,#fbf8f0_0%,#f4efe4_60%)] pt-[88px] pb-[118px]')}>
            <div className="mx-auto w-full max-w-[1120px] px-[22px] text-center">
                <div className="reveal text-xs font-bold tracking-[0.36em] text-wine uppercase">Cuenta regresiva</div>
                <h2 className="reveal mt-2.5 mb-[30px] font-serif text-[clamp(32px,6vw,58px)] font-semibold text-ink">Faltan para el gran día</h2>
                <CountdownPanel targetDate={wedding.weddingAt} />
                <div className="reveal mt-[30px] font-serif text-[clamp(17px,2.6vw,22px)] text-ink-soft italic">{labels.countdownCaption}</div>
            </div>
        </section>
    );
}

function CtaSection({ onConfirm }: { onConfirm: () => void }) {
    return (
        <section className={cn(snapClass, 'bg-gradient-to-b from-parchment-light to-[#eae1cf] pt-24 pb-[118px]')}>
            <div className="mx-auto w-full max-w-[720px] px-[22px] text-center">
                <div className="reveal inline-flex items-center gap-2.5 text-wine">
                    <span className="h-px w-[30px] bg-wine/40" />
                    <Heart className="size-[18px]" strokeWidth={1.5} />
                    <span className="h-px w-[30px] bg-wine/40" />
                </div>
                <h2 className="reveal mt-5 font-serif text-[clamp(30px,5.5vw,52px)] leading-[1.08] font-semibold text-ink">
                    Con la bendición de Dios y de nuestras familias, queremos compartir contigo este momento.
                </h2>
                <p className="reveal mx-auto mt-[22px] max-w-[520px] text-[clamp(14px,2.2vw,16.5px)] leading-[1.75] text-ink-soft">
                    Tu presencia hará de este día un recuerdo aún más especial. Con todo nuestro cariño, esperamos contar contigo.
                </p>
                <WineButton
                    onClick={onConfirm}
                    className="reveal mt-[30px] inline-flex w-auto rounded-full px-[30px] py-4 shadow-[0_18px_34px_-14px_var(--color-wine-deep)]"
                >
                    Confirmar asistencia
                    <ArrowRight className="size-[17px]" strokeWidth={2} />
                </WineButton>
            </div>
        </section>
    );
}
