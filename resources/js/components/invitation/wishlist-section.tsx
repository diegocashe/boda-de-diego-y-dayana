import { Form } from '@inertiajs/react';
import { Check, Gift as GiftIcon, ImageOff } from 'lucide-react';
import { reserve } from '@/routes/invitation/wishlist';
import SectionHeader from '@/components/invitation/section-header';
import { cn } from '@/lib/utils';
import type { WishlistItem } from '@/types/invitation';

interface WishlistSectionProps {
    items: WishlistItem[];
}

export default function WishlistSection({ items }: WishlistSectionProps) {
    return (
        <>
            <SectionHeader eyebrow="Con cariño" title="Mesa de regalos" className="mb-[clamp(26px,4vw,46px)]" as="h1" />
            <p className="reveal mx-auto -mt-[clamp(16px,3vw,26px)] mb-[clamp(26px,4vw,46px)] max-w-[560px] text-center text-[14.5px] leading-relaxed text-ink-soft">
                Tu presencia es el regalo más importante. Si deseas obsequiarnos algo más, aquí compartimos algunas ideas con todo nuestro cariño.
            </p>

            <div className="grid grid-cols-1 gap-5 desk:grid-cols-3 sm:grid-cols-2">
                {items.map((item) => (
                    <WishlistCard key={item.id} item={item} />
                ))}
                {items.length === 0 && <div className="py-8 text-center text-ink-soft">Aún no hay artículos en la lista de deseos.</div>}
            </div>
        </>
    );
}

function WishlistCard({ item }: { item: WishlistItem }) {
    const isReserved = item.status === 'reserved';
    const aspectRatio = item.imageWidth && item.imageHeight ? `${item.imageWidth} / ${item.imageHeight}` : undefined;

    return (
        <div className="reveal group relative overflow-hidden rounded-[20px] border border-ink/[0.08] bg-white shadow-[0_22px_44px_-32px_rgba(58,52,43,0.7)]">
            {item.imageUrl ? (
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="block w-full object-cover"
                    style={aspectRatio ? { aspectRatio } : undefined}
                    loading="lazy"
                />
            ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-parchment text-ink-faint">
                    <ImageOff className="size-6" strokeWidth={1.7} />
                </div>
            )}

            <span
                className={cn(
                    'absolute top-3 left-3 rounded-full px-[11px] py-[5px] text-[11px] font-bold tracking-[0.04em] shadow-[0_6px_14px_-8px_rgba(0,0,0,0.4)] transition-opacity duration-200 group-hover:opacity-0',
                    isReserved ? 'bg-[#f0ece4] text-ink-faint' : 'bg-sage-tint text-sage',
                )}
            >
                {isReserved ? 'Reservado' : 'Disponible'}
            </span>

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-[17px_18px_19px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <h3 className="mb-1.5 font-serif text-[22px] font-semibold text-cream">{item.title}</h3>
                <p className="mb-3 line-clamp-4 text-[13.5px] leading-relaxed text-cream/85">{item.description}</p>

                <Form {...reserve.form(item.id)} options={{ preserveScroll: true }}>
                    {({ processing }) => (
                        <button
                            type="submit"
                            disabled={isReserved || processing}
                            className={cn(
                                'flex items-center justify-center gap-2 rounded-[13px] p-[13px] text-sm font-bold transition-colors duration-200',
                                isReserved || processing
                                    ? 'cursor-not-allowed bg-cream/20 text-cream/60'
                                    : 'cursor-pointer bg-wine text-cream shadow-[0_14px_26px_-14px_var(--color-wine)]',
                            )}
                        >
                            {isReserved ? (
                                <>
                                    <Check className="size-[15px]" strokeWidth={2.3} />
                                    Reservado
                                </>
                            ) : (
                                <>
                                    <GiftIcon className="size-[15px]" strokeWidth={2.3} />
                                    Reservar
                                </>
                            )}
                        </button>
                    )}
                </Form>
            </div>
        </div>
    );
}
