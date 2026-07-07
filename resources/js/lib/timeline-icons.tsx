import { Calendar, Camera, Church, Coffee, Gem, Heart, Home, MapPin, Music, Plane } from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

// Debe coincidir con TimelineItem::ICONS en el backend.
export const TIMELINE_ICONS: Record<string, LucideIcon> = {
    coffee: Coffee,
    plane: Plane,
    home: Home,
    gem: Gem,
    heart: Heart,
    church: Church,
    calendar: Calendar,
    'map-pin': MapPin,
    camera: Camera,
    music: Music,
};

export const TIMELINE_ICON_LABELS: Record<string, string> = {
    coffee: 'Café',
    plane: 'Avión',
    home: 'Casa',
    gem: 'Anillo',
    heart: 'Corazón',
    church: 'Iglesia',
    calendar: 'Calendario',
    'map-pin': 'Ubicación',
    camera: 'Cámara',
    music: 'Música',
};

export function TimelineIcon({ name, ...props }: { name: string } & LucideProps) {
    const Icon = TIMELINE_ICONS[name] ?? Heart;

    return <Icon {...props} />;
}
