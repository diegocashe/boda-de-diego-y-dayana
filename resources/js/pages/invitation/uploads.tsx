import { Head } from '@inertiajs/react';
import GuestUploadSection from '@/components/invitation/guest-upload-section';
import ScrollView from '@/components/invitation/scroll-view';
import type { GuestUploadInvitation } from '@/types/invitation';

interface InvitationUploadsProps {
    guest: GuestUploadInvitation;
}

export default function InvitationUploads({ guest }: InvitationUploadsProps) {
    return (
        <>
            <Head title={`Comparte tus fotos · ${guest.name}`} />
            <ScrollView className="max-w-[1040px]">
                <GuestUploadSection guestName={guest.name} invitationCode={guest.code} />
            </ScrollView>
        </>
    );
}
