import { Head } from '@inertiajs/react';
import DetailsSection from '@/components/invitation/details-section';
import ScrollView from '@/components/invitation/scroll-view';

export default function InvitationDetails() {
    return (
        <>
            <Head title="Detalles" />
            <ScrollView>
                <DetailsSection />
            </ScrollView>
        </>
    );
}
