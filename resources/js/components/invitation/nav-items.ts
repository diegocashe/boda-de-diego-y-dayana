import { ClipboardCheck, Gift, Heart, Home, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { home } from '@/routes';
import { details, rsvp, story, wishlist } from '@/routes/invitation';
import type { RouteDefinition } from '@/wayfinder';

export const NAV_ITEMS: { href: RouteDefinition<'get'>; label: string; icon: LucideIcon }[] = [
    { href: home(), label: 'Inicio', icon: Home },
    { href: story(), label: 'Historia', icon: Heart },
    { href: rsvp(), label: 'Asistencia', icon: ClipboardCheck },
    { href: details(), label: 'Info', icon: MapPin },
    { href: wishlist(), label: 'Regalos', icon: Gift },
];

export function isActiveNavItem(currentUrl: string, href: RouteDefinition<'get'>): boolean {
    return currentUrl.split('?')[0] === href.url;
}
