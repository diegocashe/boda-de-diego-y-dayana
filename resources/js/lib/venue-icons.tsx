import { Calendar, Church, Gem, Gift, Heart, MapPin } from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

// Debe coincidir con Venue::ICONS en el backend.
export const VENUE_ICONS: Record<string, LucideIcon> = {
    church: Church,
    calendar: Calendar,
    'map-pin': MapPin,
    gem: Gem,
    heart: Heart,
    gift: Gift,
};

export const VENUE_ICON_LABELS: Record<string, string> = {
    church: 'Iglesia',
    calendar: 'Calendario',
    'map-pin': 'Ubicación',
    gem: 'Anillo',
    heart: 'Corazón',
    gift: 'Regalo',
};

export function VenueIcon({ name, ...props }: { name: string } & LucideProps) {
    const Icon = VENUE_ICONS[name] ?? MapPin;

    return <Icon {...props} />;
}
