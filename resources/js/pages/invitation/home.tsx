import { Head } from '@inertiajs/react';
import HomeSection from '@/components/invitation/home-section';
import type { WeddingDetails } from '@/types/invitation';

interface InvitationHomeProps {
    wedding: WeddingDetails;
}

export default function InvitationHome({ wedding }: InvitationHomeProps) {
    return (
        <>
            <Head title="Invitación" />
            <HomeSection wedding={wedding} />
        </>
    );
}
