import { Calendar, Church, Coffee, Gem, Home, MapPin, Plane } from 'lucide-react';
import type { GiftRegistryEntry, TimelineMilestone, VenueDetail, WeddingDetails } from '@/types/invitation';

export interface WeddingLabels {
    dateLabel: string;
    placeLabel: string;
    countdownCaption: string;
}

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function buildWeddingLabels(wedding: WeddingDetails): WeddingLabels {
    const date = new Date(wedding.weddingAt);
    const weekday = capitalize(date.toLocaleDateString('es-MX', { weekday: 'long' }));
    const month = capitalize(date.toLocaleDateString('es-MX', { month: 'long' }));
    const day = date.getDate();
    const year = date.getFullYear();

    const suffix = date.getHours() >= 12 ? 'PM' : 'AM';
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return {
        dateLabel: `${weekday}, ${day} de ${month} ${year}`,
        placeLabel: `${wedding.city} · ${hours}:${minutes} ${suffix}`,
        countdownCaption: `${wedding.city} · ${day} de ${month} de ${year}`,
    };
}

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
    {
        period: '2019',
        title: 'Cómo nos conocimos',
        description:
            'Entre el vapor de dos cafés y una conversación que no queríamos que terminara, una tarde cualquiera se volvió el comienzo de todo.',
        icon: Coffee,
    },
    {
        period: 'Verano 2021',
        title: 'Nuestro primer viaje',
        description: 'Maletas ligeras y un mapa lleno de planes. Descubrimos que viajar juntos era, en realidad, viajar hacia el mismo lugar.',
        icon: Plane,
    },
    {
        period: '2023',
        title: 'Nuestro primer hogar',
        description: 'Cajas, plantas nuevas y un café por estrenar. Construimos un espacio donde todos los días se sienten como estar en casa.',
        icon: Home,
    },
    {
        period: 'Diciembre 2025',
        title: 'La propuesta',
        description: 'Bajo las luces de invierno, una rodilla en el suelo y un «sí» que nos trajo hasta aquí. Ahora queremos celebrarlo contigo.',
        icon: Gem,
        highlighted: true,
    },
];

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
