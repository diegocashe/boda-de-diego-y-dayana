import { ClipboardCheck, Heart, Home, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { InvitationTab } from '@/types/invitation';

export const NAV_ITEMS: { tab: InvitationTab; label: string; icon: LucideIcon }[] = [
    { tab: 'home', label: 'Inicio', icon: Home },
    { tab: 'story', label: 'Historia', icon: Heart },
    { tab: 'rsvp', label: 'Asistencia', icon: ClipboardCheck },
    { tab: 'details', label: 'Info', icon: MapPin },
];

export interface NavProps {
    activeTab: InvitationTab;
    onNavigate: (tab: InvitationTab) => void;
}
