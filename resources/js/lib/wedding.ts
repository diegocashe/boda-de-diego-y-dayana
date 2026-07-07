import { Calendar, Church, MapPin } from 'lucide-react';
import type { GiftRegistryEntry, VenueDetail, WeddingDetails } from '@/types/invitation';

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

export const VENUES: VenueDetail[] = [
    {
        label: 'Ceremonia religiosa',
        name: 'Parroquia de San Miguel',
        schedule: 'Av. Reforma 210, Col. Centro · 5:00 PM',
        mapsUrl: 'https://maps.google.com/?q=Parroquia+San+Miguel+CDMX',
        icon: Church,
        accent: 'wine',
    },
    {
        label: 'Registro civil',
        name: 'Salón Art Nouveau',
        schedule: 'Av. Juárez 88, Centro · 6:15 PM',
        mapsUrl: 'https://maps.google.com/?q=Salon+Art+Nouveau+CDMX',
        icon: Calendar,
        accent: 'sage',
    },
    {
        label: 'Recepción',
        name: 'Jardín Los Olivos',
        schedule: 'Camino Real 45, Valle Verde · 7:00 PM',
        mapsUrl: 'https://maps.google.com/?q=Jardin+Los+Olivos',
        icon: MapPin,
        accent: 'wine',
    },
];

export const GIFT_REGISTRY: GiftRegistryEntry[] = [
    { label: 'Liverpool · Código', value: '51820394' },
    { label: 'CLABE (BBVA)', value: '012 180 0154 0392 18' },
];

export const GODPARENTS_CONTACT = {
    whatsappUrl: 'https://wa.me/525512345678',
    phoneUrl: 'tel:+525512345678',
} as const;
