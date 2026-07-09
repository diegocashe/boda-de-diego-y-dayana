import { Head } from '@inertiajs/react';
import HomeSection from '@/components/invitation/home-section';
import type { HomeContent, WeddingDetails } from '@/types/invitation';

interface InvitationHomeProps {
    wedding: WeddingDetails;
    content: HomeContent;
}

export default function InvitationHome({ wedding, content }: InvitationHomeProps) {
    return (
        <>
            <Head title="Invitación" />
            <HomeSection wedding={wedding} content={content} />
        </>
    );
}
