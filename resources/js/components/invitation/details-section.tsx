import { Gift, MapPin, MessageCircle, Phone } from 'lucide-react';
import SectionHeader from '@/components/invitation/section-header';
import VenueMap from '@/components/invitation/venue-map';
import { VenueIcon } from '@/lib/venue-icons';
import { GIFT_REGISTRY, GODPARENTS_CONTACT } from '@/lib/wedding';
import { cn } from '@/lib/utils';
import type { VenueDetail } from '@/types/invitation';

const cardClass = 'reveal rounded-[20px] border border-ink/[0.08] bg-white p-5 shadow-[0_22px_44px_-32px_rgba(58,52,43,0.7)]';

const venueAccents = {
    wine: { chip: 'bg-blush-tint text-wine', pin: 'text-wine' },
    sage: { chip: 'bg-sage-tint text-sage', pin: 'text-sage' },
} as const;

// Tailwind necesita clases literales; no se puede interpolar el número de columnas.
const desktopGridCols = {
    1: 'desk:grid-cols-1',
    2: 'desk:grid-cols-2',
    3: 'desk:grid-cols-3',
} as const;

interface DetailsSectionProps {
    venues: VenueDetail[];
}

export default function DetailsSection({ venues }: DetailsSectionProps) {
    const columns = Math.min(venues.length, 3) as 1 | 2 | 3;

    return (
        <>
            <SectionHeader title="Detalles del evento" className="mb-[clamp(26px,4vw,46px)]" />

            {venues.length > 0 && (
                <div className={cn('mb-5 grid grid-cols-1 gap-3.5 desk:items-stretch desk:gap-5', desktopGridCols[columns])}>
                    {venues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue} />
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 gap-3.5 desk:gap-5">
                <div className={cn(cardClass, 'p-[22px]')}>
                    <div className="flex items-start gap-[13px]">
                        <span className="grid size-10 flex-none place-items-center rounded-xl bg-[#f5eee2] text-gold-deep">
                            <Gift className="size-5" strokeWidth={1.7} />
                        </span>
                        <div className="flex-1">
                            <div className="text-[11px] font-bold tracking-[0.14em] text-ink-faint uppercase">Mesa de regalos</div>
                            <div className="my-0.5 font-serif text-[23px] font-semibold text-ink">Lluvia de sobres</div>
                            <div className="text-[13px] leading-normal text-ink-soft">
                                Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo más, aquí tienes nuestros datos:
                            </div>
                        </div>
                    </div>
                    <div className="mt-[15px] grid grid-cols-1 gap-2">
                        {GIFT_REGISTRY.map((entry) => (
                            <div key={entry.label} className="flex items-center justify-between rounded-xl bg-[#f7f3ea] px-[15px] py-3 text-[13px]">
                                <span className="text-ink-muted">{entry.label}</span>
                                <span className="font-mono font-bold tracking-[0.05em] text-ink">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="reveal rounded-[20px] bg-gradient-to-br from-cocoa to-[#161010] p-[22px] text-cream">
                    <div className="text-[11px] font-bold tracking-[0.14em] uppercase opacity-70">¿Tienes dudas?</div>
                    <div className="mt-[3px] mb-3.5 font-serif text-[23px] font-semibold">Escríbele a los padrinos</div>
                    <div className="grid max-w-[460px] grid-cols-2 gap-2.5">
                        <a
                            href={GODPARENTS_CONTACT.whatsappUrl}
                            target="_blank"
                            rel="noopener"
                            className="flex items-center justify-center gap-2 rounded-xl bg-sage p-3 text-[13px] font-semibold text-white"
                        >
                            <MessageCircle className="size-4" strokeWidth={1.9} />
                            WhatsApp
                        </a>
                        <a
                            href={GODPARENTS_CONTACT.phoneUrl}
                            className="flex items-center justify-center gap-2 rounded-xl bg-cream/12 p-3 text-[13px] font-semibold text-cream"
                        >
                            <Phone className="size-4" strokeWidth={1.9} />
                            Llamar
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

function VenueCard({ venue }: { venue: VenueDetail }) {
    const accent = venueAccents[venue.accent];
    const hasLocation = venue.lat !== null && venue.lng !== null;
    const mapsUrl = hasLocation ? `https://maps.google.com/?q=${venue.lat},${venue.lng}` : null;

    return (
        <div className={cn(cardClass, 'flex flex-col')}>
            <div className="flex flex-1 items-start gap-[13px]">
                <span className={cn('grid size-10 flex-none place-items-center rounded-xl', accent.chip)}>
                    <VenueIcon name={venue.icon} className="size-5" strokeWidth={1.7} />
                </span>
                <div>
                    <div className="text-[11px] font-bold tracking-[0.14em] text-ink-faint uppercase">{venue.label}</div>
                    <div className="my-0.5 font-serif text-[23px] font-semibold text-ink">{venue.name}</div>
                    <div className="text-[13px] leading-normal text-ink-soft">{venue.schedule}</div>
                </div>
            </div>

            {hasLocation && (
                <div className="mt-[15px] h-[160px] overflow-hidden rounded-xl border border-ink/10">
                    <VenueMap lat={venue.lat as number} lng={venue.lng as number} name={venue.name} />
                </div>
            )}

            {mapsUrl && (
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="mt-[10px] flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-[#f7f3ea] p-[11px] text-[13px] font-semibold text-ink"
                >
                    <MapPin className={cn('size-[15px]', accent.pin)} strokeWidth={1.9} />
                    Google Maps
                </a>
            )}
        </div>
    );
}
