import type { GiftRegistryEntry, WeddingDetails } from '@/types/invitation';

export interface WeddingLabels {
    dateLabel: string;
    placeLabel: string;
    countdownCaption: string;
}

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function buildWeddingLabels(wedding: WeddingDetails): WeddingLabels {
    const date = new Date(wedding.weddingAt);
    const weekday = capitalize(date.toLocaleDateString('es-MX', { weekday: 'long', timeZone: 'UTC' }));
    const month = capitalize(date.toLocaleDateString('es-MX', { month: 'long', timeZone: 'UTC' }));
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const suffix = date.getUTCHours() >= 12 ? 'PM' : 'AM';
    const hours = date.getUTCHours() % 12 || 12;
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return {
        dateLabel: `${weekday}, ${day} de ${month} ${year}`,
        placeLabel: `${wedding.city} · ${hours}:${minutes} ${suffix}`,
        countdownCaption: `${wedding.city} · ${day} de ${month} de ${year}`,
    };
}

export const GIFT_REGISTRY: GiftRegistryEntry[] = [
    { label: 'Liverpool · Código', value: '51820394' },
    { label: 'CLABE (BBVA)', value: '012 180 0154 0392 18' },
];

export const GODPARENTS_CONTACT = {
    whatsappUrl: 'https://wa.me/525512345678',
    phoneUrl: 'tel:+525512345678',
} as const;
