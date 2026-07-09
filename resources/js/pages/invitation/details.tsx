import { Head } from '@inertiajs/react';
import DetailsSection from '@/components/invitation/details-section';
import ScrollView from '@/components/invitation/scroll-view';
import type { GiftRegistryEntry, GodparentsContact, VenueDetail } from '@/types/invitation';

interface InvitationDetailsProps {
    venues: VenueDetail[];
    giftRegistry: GiftRegistryEntry[];
    godparents: GodparentsContact;
}

export default function InvitationDetails({ venues, giftRegistry, godparents }: InvitationDetailsProps) {
    return (
        <>
            <Head title="Detalles" />
            <ScrollView>
                <DetailsSection venues={venues} giftRegistry={giftRegistry} godparents={godparents} />
            </ScrollView>
        </>
    );
}
