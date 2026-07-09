import { Head } from '@inertiajs/react';
import DetailsSection from '@/components/invitation/details-section';
import ScrollView from '@/components/invitation/scroll-view';
import type { VenueDetail } from '@/types/invitation';

interface InvitationDetailsProps {
    venues: VenueDetail[];
}

export default function InvitationDetails({ venues }: InvitationDetailsProps) {
    return (
        <>
            <Head title="Detalles" />
            <ScrollView>
                <DetailsSection venues={venues} />
            </ScrollView>
        </>
    );
}
