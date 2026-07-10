import { useMemo } from 'react';
import { pickRandomCr7Video } from '@/lib/cr7-videos';
import type { RsvpAttendance } from '@/types/invitation';

interface RsvpReactionVideoProps {
    attending: RsvpAttendance | null;
}

export default function RsvpReactionVideo({ attending }: RsvpReactionVideoProps) {
    const src = useMemo(() => (attending ? pickRandomCr7Video(attending) : null), [attending]);

    if (!src) {
        return null;
    }

    return (
        <div className="mb-[18px] overflow-hidden rounded-[14px] bg-[#1b1210]">
            <video key={src} src={src} autoPlay muted loop playsInline className="aspect-video w-full object-cover" />
        </div>
    );
}
