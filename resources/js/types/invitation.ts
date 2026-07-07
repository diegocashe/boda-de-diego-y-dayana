import type { LucideIcon } from 'lucide-react';

export interface WeddingDetails {
    groomName: string;
    brideName: string;
    weddingAt: string;
    city: string;
}

export interface GuestInvitation {
    name: string;
    maxPasses: number;
    videoUrl: string | null;
    videoMessage: string;
}

export interface TimelineMilestone {
    id: number;
    period: string;
    title: string;
    description: string;
    icon: string;
    highlighted: boolean;
    imageUrl: string | null;
}

export interface VenueDetail {
    label: string;
    name: string;
    schedule: string;
    mapsUrl: string;
    icon: LucideIcon;
    accent: 'wine' | 'sage';
}

export interface GiftRegistryEntry {
    label: string;
    value: string;
}

export type RsvpAttendance = 'yes' | 'no';

export interface RsvpFormData {
    attending: RsvpAttendance | null;
    guests: number;
    dietary: string;
    message: string;
}
