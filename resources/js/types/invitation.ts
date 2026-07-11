export interface WeddingDetails {
    groomName: string;
    brideName: string;
    weddingAt: string;
    city: string;
}

export interface HomeContent {
    heroEyebrow: string;
    heroScrollHint: string;
    countdownEyebrow: string;
    countdownHeading: string;
    ctaHeading: string;
    ctaParagraph: string;
    ctaButtonLabel: string;
}

export type AttendanceMode = 'in_person' | 'online';

export interface GuestInvitation {
    name: string;
    code: string;
    maxPasses: number;
    mode: AttendanceMode;
    meetingUrl: string | null;
    locked: boolean;
    videoUrl: string | null;
    videoMessage: string;
    response: RsvpFormData | null;
}

export interface TimelineMilestone {
    id: number;
    period: string;
    title: string;
    description: string;
    icon: string;
    highlighted: boolean;
    imageUrl: string | null;
    imageWidth: number | null;
    imageHeight: number | null;
    videoUrl: string | null;
    videoPosterUrl: string | null;
}

export interface VenueDetail {
    id: number;
    label: string;
    name: string;
    schedule: string;
    lat: number | null;
    lng: number | null;
    icon: string;
    accent: 'wine' | 'sage';
}

export interface GiftRegistryEntry {
    label: string;
    value: string;
}

export interface GodparentsContact {
    whatsappUrl: string | null;
    phoneUrl: string | null;
}

export type RsvpAttendance = 'yes' | 'no';

export interface RsvpFormData {
    attending: RsvpAttendance | null;
    guests: number;
    dietary: string;
    message: string;
}
